const packageInstaller = (d) => {
  if (!d) return null
  if (!Array.isArray(d)) throw "Input is not an array"

  const result = []

  d.forEach(pckg => {
    if (!pckg.dependencies) {
      result.push(pckg)
      d.splice(d.indexOf(pckg));
    }
  })

  for (let i in d) {
    result.push(d[i]) && d.shift()
  }
  console.log(result)
  return result
}

module.exports = packageInstaller;

