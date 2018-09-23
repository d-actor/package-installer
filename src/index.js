const packageInstaller = (d) => {
  if (!d) return null
  if (!Array.isArray(d)) throw "Input is not an array"

  const result = []
  const deps = []

  d.forEach(pckg => {
    pckg = pckg.split(': ')
    if (!pckg[1]) {
      result.push(pckg[0])
    } else deps.push(pckg)
  })

  console.log(deps)

  if (deps.length === 1) {
    result.push(deps[0][0])
    return result.join(', ').split()
  }

  function Graph() {
    this.adjList = {}
  }

  Graph.prototype.addVertex = function (v) {
    this.adjList[v] = []
  }

  Graph.prototype.addEdge = function (v1,v2) {
    this.adjList[v1].push(v2)
  }

  Graph.prototype._detectCycleUtil = function(vertex, visited, recStack) {
    if(!visited[vertex]) {
      visited[vertex] = true
      recStack[vertex] = true
      const nodeNeighbors = this.adjList[vertex]
      for(let i = 0; i < nodeNeighbors.length; i++) {
        const currentNode = nodeNeighbors[i]
        if(!visited[currentNode] && this._detectCycleUtil(currentNode, visited, recStack)) {
          return true
        } else if (recStack[currentNode]) {
          return true
        }
      }
    }
    recStack[vertex] = false
    return false;
  }

  Graph.prototype.detectCycle = function() {
    const nodes = Object.keys(this.adjList)
    const visited = {}
    const recStack = {}

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (this._detectCycleUtil(node, visited, recStack))
        throw "Invalid input, contains a cycle."
    }
    return 'no cycle'
  }

  const buildGraph = (deps, graph) => {
    deps.map(pckg => {
      graph.addVertex(pckg[0])
      graph.addEdge(pckg[0], pckg[1])
    })
    return graph
  }

  const graph = new Graph()
  buildGraph(deps, graph)
  graph.detectCycle()


  for ( let i = 0; i <= deps.length; i++) {
    for (let compare of deps.slice(1)) {
      if (false) {
      } else if (deps[0][1] === compare[0] && !deps.slice(2).includes(compare[1])) {
        result.push(compare[0])
        deps.splice(1, 1)
      } else {
        result.push(deps[0] [0])
        deps.splice(0, 1)
      }
    }
  }
  result.push(deps[0][0])

  return result.join(', ').split()
}

module.exports = packageInstaller;

