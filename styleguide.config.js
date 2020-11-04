const path = require('path');

console.log('MIKE');
console.log(path.join(__dirname, 'styleguide/components/Wrapper.tsx'));
console.log('MIKE');

module.exports = {
  components: 'src/components/alignmentEditor**/*.tsx',
  propsParser: require('react-docgen-typescript').parse,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper.tsx'),
  },
};
