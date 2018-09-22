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

  if (deps.length === 1) {
    result.push(deps[0][0])
    return result.join(', ').split()
  }


  for ( let i = 0; i <= deps.length; i++) {
    for (let compare of deps.slice(1)) {
      if (deps[0][1] === compare[0]) {
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

