import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledHome = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
`;

const Bloc = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-size: cover;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    p,
    h1 {
      padding: 16px;
      color: white;
      font-weight: bold;
      width: 50%;
      margin-left: ${props => (props.right === true ? "auto" : "0")};
      margin-right: ${props => (props.right === true ? "0" : "auto")};
    }
  }
  @media only screen and (max-width: 768px) {
    div {
      p,
      h1 {
        width: 100%;
      }
    }
  }
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
      <Bloc imageUrl="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80">
        <div>
          <h1>Un Partenaire sûr</h1>
          <p>
            FS immobilier est un partenaire sûr pour vos recherches. Nous vous
            mettons en contact direct avec vos clients , vendeurs ou acheteurs.
            Évitez ainsi les intermédiaires et économisez de l'argent.
          </p>
        </div>
      </Bloc>
      <Bloc
        imageUrl="https://images.pexels.com/photos/7681419/pexels-photo-7681419.jpeg?cs=srgb&dl=pexels-karolina-grabowska-7681419.jpg&fm=jpg"
        right={true}
      >
        <div>
          <h1>Contrôle de tous les documents</h1>
          <p>
            Nous contrôlons tous les documents qui nous parviennent avant
            installation sur notre site. Nous pourrons vous appelez pour plus
            d'informations. Pour vos opérations d'achat , location ou de vente,
            nous vous conseillons de prendre un notaire que nous vous proposons
            ou que vous choisirez vous même.
          </p>
        </div>
      </Bloc>
      <Bloc imageUrl="https://images.pexels.com/photos/3228687/pexels-photo-3228687.jpeg?cs=srgb&dl=pexels-fauxels-3228687.jpg&fm=jpg">
        <div>
          <h1>Mise en contact</h1>
          <p>
            Notre devoir est de vous mettre en contact avec d'autres
            utilisateurs de notre site, ce faisant nous ne prenons aucune
            garantie d'achat ou de vente faite sans notre présence. Service
            clientèle +225 07 48 97 00 51
          </p>
        </div>
      </Bloc>
    </StyledHome>
  );
}

export default Home;
