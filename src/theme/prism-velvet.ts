import type {PrismTheme} from 'prism-react-renderer';

/** Light code theme — navy / cream / brass (Velvet Room). */
const theme: PrismTheme = {
  plain: {
    color: '#1a2332',
    backgroundColor: '#ede8df',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'cdata'],
      style: {color: '#5c6478', fontStyle: 'italic'},
    },
    {
      types: ['namespace'],
      style: {opacity: 0.75},
    },
    {
      types: ['string', 'attr-value'],
      style: {color: '#8a6d1a'},
    },
    {
      types: ['punctuation', 'operator'],
      style: {color: '#3d4f66'},
    },
    {
      types: ['number', 'boolean', 'builtin', 'char', 'constant', 'symbol'],
      style: {color: '#722f37'},
    },
    {
      types: ['property', 'function', 'tag', 'deleted', 'selector'],
      style: {color: '#1b2838', fontWeight: '600'},
    },
    {
      types: ['keyword', 'atrule', 'important'],
      style: {color: '#1b2838', fontWeight: '700'},
    },
    {
      types: ['class-name', 'maybe-class-name'],
      style: {color: '#2a4a6e'},
    },
    {
      types: ['regex'],
      style: {color: '#1f5c4a'},
    },
    {
      types: ['variable', 'parameter', 'inserted'],
      style: {color: '#2a3d52'},
    },
    {
      types: ['entity', 'url'],
      style: {color: '#9b2c3e'},
    },
  ],
};

export default theme;
