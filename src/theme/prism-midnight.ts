import type {PrismTheme} from 'prism-react-renderer';

/** Dark code theme — charcoal / emerald (Midnight Suite). */
const theme: PrismTheme = {
  plain: {
    color: '#e8eaed',
    backgroundColor: '#161b24',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'cdata'],
      style: {color: '#64748b', fontStyle: 'italic'},
    },
    {
      types: ['namespace'],
      style: {opacity: 0.75},
    },
    {
      types: ['string', 'attr-value'],
      style: {color: '#6ee7b7'},
    },
    {
      types: ['punctuation', 'operator'],
      style: {color: '#94a3b8'},
    },
    {
      types: ['number', 'boolean', 'builtin', 'char', 'constant', 'symbol'],
      style: {color: '#fbbf24'},
    },
    {
      types: ['property', 'function', 'tag', 'deleted', 'selector'],
      style: {color: '#34d399', fontWeight: '600'},
    },
    {
      types: ['keyword', 'atrule', 'important'],
      style: {color: '#10b981', fontWeight: '700'},
    },
    {
      types: ['class-name', 'maybe-class-name'],
      style: {color: '#7dd3fc'},
    },
    {
      types: ['regex'],
      style: {color: '#a7f3d0'},
    },
    {
      types: ['variable', 'parameter', 'inserted'],
      style: {color: '#cbd5e1'},
    },
    {
      types: ['entity', 'url'],
      style: {color: '#fca5a5'},
    },
  ],
};

export default theme;
