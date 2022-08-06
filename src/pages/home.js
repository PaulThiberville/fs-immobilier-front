import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledHome = styled.main`
  flex-grow: 1;
`;

function Home() {
  return (
    <StyledHome>
      <Helmet>
        <title>FS Immobilier - Annonces immobilieres en Côte d'Ivoire</title>
        <meta
          name="description"
          content="Recherchez parmis de nombreuses annonces de vente ou de location immobiliere de particuliers en Côte d'Ivoire"
        />
      </Helmet>
      <div></div>
    </StyledHome>
  );
}

export default Home;
