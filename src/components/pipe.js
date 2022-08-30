import styled from "styled-components";
import { useEffect, useState } from "react";
import Button from "./Button";

const StyledPipe = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: ${props => (props.type === "desktop" ? "flex" : "none")};

  @media only screen and (max-width: 500px) {
    display: ${props =>
      props.type === "mobile" && props.currentIndex === props.index
        ? "flex"
        : "none"};
    width: 100%;
  }
`;

const Steps = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const Step = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  background-color: white;
  border-bottom: ${props =>
    props.index === props.currentIndex ? "solid 4px green" : "solid 4px grey"};
  transition: border 0.5s;
  p {
    background-color: ${props =>
      props.index === props.currentIndex ? "green" : "grey"};
    color: white;
    transition: background-color 0.5s, color 0.5s;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    margin-top: 8px;
  }
  strong {
    color: ${props => (props.index === props.currentIndex ? "green" : "grey")};
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin: 16px 0;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

export default function Pipe({ steps }) {
  const [index, setIndex] = useState(1);
  const [step, setStep] = useState(null);

  useEffect(() => {
    setStep(steps.find(step => step.index === index));
  }, [index]);

  return (
    <StyledPipe>
      <Steps>
        {steps.map(aStep => {
          aStep.currentIndex = index;
          return (
            <>
              <Step
                key={aStep.index}
                index={aStep.index}
                currentIndex={aStep.currentIndex}
                onClick={() => setIndex(aStep.index)}
              >
                <p>{aStep.index}</p>
                <strong>{aStep.title}</strong>
              </Step>
              <Container
                type="mobile"
                index={aStep.index}
                currentIndex={aStep.currentIndex}
              >
                {steps.find(step => step.index === index).component}
              </Container>
            </>
          );
        })}
      </Steps>

      {
        <Container type="desktop">
          {steps.find(step => step.index === index).component}
        </Container>
      }
      <Buttons>
        <Button onClick={() => setIndex(index - 1)} disabled={index <= 1}>
          Retour
        </Button>
        <Button
          onClick={() => setIndex(index + 1)}
          disabled={index >= steps.length}
        >
          Suivant
        </Button>
      </Buttons>
    </StyledPipe>
  );
}
