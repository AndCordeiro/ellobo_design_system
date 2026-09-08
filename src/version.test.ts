import pkg from '../package.json';
import { designSystemVersion } from './version';

describe('designSystemVersion', () => {
  it('matches the version declared in package.json', () => {
    expect(designSystemVersion).toBe(pkg.version);
  });

  it('follows semantic versioning', () => {
    expect(designSystemVersion).toMatch(/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/);
  });
});
