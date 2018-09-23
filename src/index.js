const packageInstaller = (d) => {
  if (!d) return null
  if (!Array.isArray(d)) throw "Input is not an array"

  const result = []

  function Graph() {
    this.adjList = {}
  }

  Graph.prototype.addVertex = function(v) {
    this.adjList[v] = []
  }

  Graph.prototype.addEdge = function(v1,v2) {
    this.adjList[v1].push(v2)
  }

  Graph.prototype.sort = function() {
    const nodes = Object.keys(this.adjList)
    const sortVisited = {}
    const cycleVisited = {}
    const recStack = {}
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      this._sortUtil(node, sortVisited)
      this._cycleUtil(node, cycleVisited, recStack)
    }
    nodes.forEach(node => {
      !result.includes(node) && result.push(node)
    })
  }

  Graph.prototype._sortUtil = function(vertex, visited) {
    if (!visited[vertex]) {
      visited[vertex] = true
      const neighbors = this.adjList[vertex]
      if (neighbors) {
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i]
            this._sortUtil(neighbor, visited)
        }
      }
    } else result.push(vertex)
  }

  Graph.prototype._cycleUtil = function(vertex, visited, recStack) {
    if(!visited[vertex]) {
      visited[vertex] = true
      recStack[vertex] = true
      const nodeNeighbors = this.adjList[vertex]
      if (nodeNeighbors) {
        for(let i = 0; i < nodeNeighbors.length; i++) {
          const currentNode = nodeNeighbors[i]
          if(!visited[currentNode] && this._cycleUtil(currentNode, visited, recStack)) {
            throw "Invalid input, contains a cycle."
          } else if (recStack[currentNode]) {
            throw "Invalid input, contains a cycle."
          }
        }
      }
    }
    recStack[vertex] = false
    return false;
  }

  const buildGraph = (deps, graph) => {
    deps.map(pckg => {
      graph.addVertex(pckg[0])
      graph.addEdge(pckg[0], pckg[1])
    })
    return graph
  }

  const splitStrings = (d) => {
    const deps = []
    d.forEach(pckg => {
      pckg = pckg.split(': ')
      if (!pckg[1]) {
        result.push(pckg[0])
      } else deps.push(pckg)
    })
    return deps
  }

  const graph = new Graph()
  buildGraph(splitStrings(d), graph)
  graph.sort()

  return result.join(', ').split()
}

module.exports = packageInstaller;

