import React from 'react';
import Root from '@theme-original/Root';
import type {Props} from '@theme/Root';

export default function RootWrapper(props: Props): React.JSX.Element {
  return <Root {...props} />;
}
