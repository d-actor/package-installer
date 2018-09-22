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
    let testInput = [ "KittenService: CamelCaser", "CamelCaser: " ]
    let expected = ["CamelCaser, KittenService"]
    expect(packageInstaller(testInput)).toEqual(expected)
  });

//  it('should return valid order for multiple packages', () => {
//    let testInput = [ "KittenService: ", "Leetmeme: Cyberportal", "Cyberportal: Ice", "CamelCaser: KittenService", "Fraudstream: Leetmeme", "Ice: "]
//    let expected = ["KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"]
//		expect(packageInstaller(testInput)).toEqual(expected)
//  });

});

