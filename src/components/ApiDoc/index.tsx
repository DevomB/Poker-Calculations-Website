import type {ReactNode} from 'react';
import styles from './styles.module.css';

type Props = {
  title: string;
  signature: string;
  children: ReactNode;
};

export default function ApiDoc({title, signature, children}: Props): ReactNode {
  return (
    <div className={styles.wrap}>
      <h1>{title}</h1>
      <pre className={styles.signature}>{signature}</pre>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
