const path = require('node:path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
          alias: {
            // The example consumes the library through its public package name, resolved to the
            // source so changes in `src/` reload instantly without a build step.
            '@ellobo/design-system': path.join(__dirname, '..', 'src'),
          },
        },
      ],
    ],
  };
};
