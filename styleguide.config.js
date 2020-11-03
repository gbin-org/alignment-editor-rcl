const path = require('path');

module.exports = {
  components: 'src/components/alignmentEditor**/*.tsx',
  propsParser: require('react-docgen-typescript').parse,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper'),
  },
};
