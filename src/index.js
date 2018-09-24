const packageInstaller = (packagesList) => {
  if (!packagesList) return null
  if (!Array.isArray(packagesList)) throw "Input is not an array"

  const result = []

  function Graph() {
    this.adjacencyList = {}
  }

  Graph.prototype.addVertex = function(vertex) {
    this.adjacencyList[vertex] = []
  }

  Graph.prototype.addEdge = function(vertex1,vertex2) {
    this.adjacencyList[vertex1].push(vertex2)
  }

  Graph.prototype.sortPckgs = function() {
    const nodes = Object.keys(this.adjacencyList)
    const sortVisited = {}
    const cycleVisited = {}
    const recursionStack = {}
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      this._sortUtil(node, sortVisited)
      this._cycleUtil(node, cycleVisited, recursionStack)
    }
    nodes.forEach(node => {
      !result.includes(node) && result.push(node)
    })
  }

  Graph.prototype._sortUtil = function(vertex, visited) {
    if (!visited[vertex]) {
      visited[vertex] = true
      const neighbors = this.adjacencyList[vertex]
      if (neighbors) {
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i]
          this._sortUtil(neighbor, visited)
        }
      }
    } else result.push(vertex)
  }

  Graph.prototype._cycleUtil = function(vertex, visited, recursionStack) {
    if(!visited[vertex]) {
      visited[vertex] = true
      recursionStack[vertex] = true
      const neighbors = this.adjacencyList[vertex]
      if (neighbors) {
        for(let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i]
          if(!visited[neighbor] && this._cycleUtil(neighbor, visited, recursionStack)) {
            throw "Invalid input, contains a cycle."
          } else if (recursionStack[neighbor]) {
            throw "Invalid input, contains a cycle."
          }
        }
      }
    }
    recursionStack[vertex] = false
    return false;
  }

  const buildGraph = (packages, graph) => {
    packages.map(pckg => {
      graph.addVertex(pckg[0])
      graph.addEdge(pckg[0], pckg[1])
    })
    return graph
  }

  const splitStrings = (arr) => {
    const deps = []
    arr.forEach(pckg => {
      pckg = pckg.split(': ')
      if (!pckg[1]) {
        result.push(pckg[0])
      } else deps.push(pckg)
    })
    return deps
  }

  const graph = new Graph()
  buildGraph(splitStrings(packagesList), graph)
  graph.sortPckgs()

  return result.join(', ').split()
}

module.exports = packageInstaller;

