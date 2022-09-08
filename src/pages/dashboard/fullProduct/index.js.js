import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ImagesInfos } from "./components/imagesInfos";
import { ProductInfos } from "./components/productInfos";
import { GeneralInfos } from "./components/generalInfos";
import { useState } from "react";

const StyledFullProduct = styled.section`
  background-color: white;
  margin: 8px;
  min-height: 300px;
`;

const Tabs = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  .filler {
    flex-grow: 1;
    border-bottom: 4px solid lightgray;
  }
`;

const Tab = styled.div`
  padding: 16px;
  border-bottom: ${props =>
    props.currentTab.name === props.tab.name
      ? "4px solid green"
      : "4px solid lightgray"};
`;

const tabs = [
  { name: "General", component: <GeneralInfos /> },
  { name: "Produit", component: <ProductInfos /> },
  { name: "Images", component: <ImagesInfos /> },
];

export const FullProduct = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <StyledFullProduct>
      <Tabs>
        {tabs.map(tab => {
          return (
            <Tab
              currentTab={currentTab}
              tab={tab}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.name}
            </Tab>
          );
        })}
        <div className="filler"></div>;
      </Tabs>
      {currentTab.component}
    </StyledFullProduct>
  );
};
