const packageInstaller = require('../src/index');

describe('Package Installer', () => {
  it('should return null if given no input', () => {
    expect(packageInstaller()).toBeNull()
  });

  it('should throw error if input is not array', () => {
    expect( () => {
      packageInstaller("packageInstaller: jest")
    }).toThrow("Input is not an array")
  });

  it('should return valid order for two packages', () => {
    let testInput = [
      { name: "packageInstaller", dependencies: "jest" },
      { name: "jest" },
    ]
    let expected = [
      { name:"jest" },
      { name: "packageInstaller", dependencies: "jest"},
    ]
    expect(packageInstaller(testInput)).toEqual(expected)
  });

});

