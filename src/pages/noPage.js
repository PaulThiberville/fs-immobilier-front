import { Helmet } from "react-helmet";

function NoPage() {
  return (
    <div>
      <Helmet>
        <title>FS Immobilier - 404 </title>
        <meta name="description" content="Cette page n'existe pas." />
      </Helmet>
      <h1>Cette page n'existe pas.</h1>
    </div>
  );
}

export default NoPage;
