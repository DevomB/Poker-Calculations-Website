import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function NotFound(): React.ReactNode {
  return (
    <Layout title="Page not found">
      <main className="container margin-vert--xl" style={{textAlign: 'center'}}>
        <h1>404</h1>
        <p>That page is not in the deck.</p>
        <Link className="button button--primary" to="/">
          Back home
        </Link>
      </main>
    </Layout>
  );
}
