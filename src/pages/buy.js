import Products from "../components/products";
import { Helmet } from "react-helmet";

function Buy() {
  return (
    <>
      <Helmet>
        <title>FS Immobilier - Acheter </title>
        <meta
          name="description"
          content="Recherchez parmis de nombreuses annonces de vente de biens immobiliers en cote d'ivoire"
        />
      </Helmet>
      <Products category={"buy"} />
    </>
  );
}

export default Buy;
