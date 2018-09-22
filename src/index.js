const packageInstaller = (d) => {
  if (!d) return null
  if (!Array.isArray(d)) throw "Input is not an array"

  const result = []
  const split = []

  d.forEach(pckg => {
    pckg = pckg.split(':')
    console.log(pckg)
    if (pckg[1] === ' ') {
      result.push(pckg[0])
    } else split.push(pckg)
  })
  result.push(split[0][0])

  return result.join(', ').split()
}

module.exports = packageInstaller;

