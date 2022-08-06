import Products from "../components/products";
import { Helmet } from "react-helmet";

function Rent() {
  return (
    <>
      <Helmet>
        <title>FS Immobilier - Louer </title>
        <meta
          name="description"
          content="Recherchez parmis de nombreuses annonces de location de biens immobiliers en cote d'ivoire"
        />
      </Helmet>
      <Products category={"rent"} />
    </>
  );
}

export default Rent;
