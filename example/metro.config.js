const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');
const librarySource = path.join(libraryRoot, 'src');

const peerDependencies = [
  'react',
  'react-native',
  'styled-components',
  'react-native-svg',
  'react-native-safe-area-context',
];

const config = getDefaultConfig(projectRoot);

// Serve the library source from the parent folder.
config.watchFolders = [librarySource];

// Every module (including the ones imported by the library source) must resolve from the
// example's node_modules so React and React Native are never duplicated.
config.resolver.nodeModulesPaths = [path.join(projectRoot, 'node_modules')];
config.resolver.blockList = [
  new RegExp(`^${escapeRegExp(path.join(libraryRoot, 'node_modules'))}/.*$`),
];
config.resolver.extraNodeModules = Object.fromEntries(
  peerDependencies.map((name) => [name, path.join(projectRoot, 'node_modules', name)]),
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = config;
