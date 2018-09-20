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

  it('should work for a small number of packages', () => {
    let testInput = [
      { name: "packageInstaller", dependencies: ["jest"] },
      { name: "jest" }
    ]
    let expected = ["jest", "packageInstaller"]

    expect(packageInstaller(testInput)).toEqual(expected)
  });

});

