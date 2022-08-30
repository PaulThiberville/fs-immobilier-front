import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Pipe from "../../components/pipe";
import ImagesInfos from "./components/imagesInfos";
import ProductInfos from "./components/productInfos";
import UserInfos from "./components/userInfos";
import Validation from "./components/validation";

const StyledSubmit = styled.section`
  width: 100%;
  padding: 16px;
`;

export default function Submit() {
  const steps = [
    {
      index: 1,
      title: "Mes coordonnées",
      component: <UserInfos />,
    },
    {
      index: 2,
      title: "Mon bien",
      component: <ProductInfos />,
    },
    {
      index: 3,
      title: "Mes images",
      component: <ImagesInfos />,
    },
    {
      index: 4,
      title: "Je valide",
      component: <Validation />,
    },
  ];

  return (
    <StyledSubmit>
      <Helmet>
        <title>FS Immobilier - Proposer un bien </title>
        <meta
          name="description"
          content="Proposez-nous un bien à la vente ou à la location."
        />
      </Helmet>
      {steps && <Pipe steps={steps} />}
    </StyledSubmit>
  );
}
