import React, {type ReactNode} from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof FooterType>;

/** Footer from theme config only — no Docusaurus marketing links. */
export default function FooterWrapper(props: Props): ReactNode {
  return <Footer {...props} />;
}
