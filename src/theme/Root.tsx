import React from 'react';
import Root from '@theme-original/Root';
import type {Props} from '@theme/Root';
import {SpeedInsights} from '@vercel/speed-insights/react';

export default function RootWrapper(props: Props): React.JSX.Element {
  return (
    <>
      <Root {...props} />
      <SpeedInsights />
    </>
  );
}
