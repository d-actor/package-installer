//const sum = require('../src/sum');
const packageInstaller = require('../src/index');

describe('Package Installer', () => {
  it('returns null when given no input', () => {
    expect(packageInstaller()).toBeNull()
  });

  it('throws error if input is not array', () => {
    expect( () => {
      packageInstaller("packageInstaller: jest")
    }).toThrow("Input is not an array")
  });
});

