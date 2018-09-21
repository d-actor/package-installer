const packageInstaller = (d) => {
  if (!d) return null
  if (!Array.isArray(d)) throw "Input is not an array"

  const result = []
  const noDeps = []
//  const viewed = []

  d.forEach(pckg => {
    if (!pckg.dependencies) {
      noDeps.unshift(pckg)
      d.splice(d.indexOf(pckg));
    }
  })

  while (d.length) {
    if (noDeps.length) {
      result.push(noDeps[0])
      noDeps.shift()
    }
    result.push(d[0]) && d.shift()
  }
  return result
}

module.exports = packageInstaller;

