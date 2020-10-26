import React from "react";
import styled from "styled-components";

const ConfirmationMsg = ({ formData }) => {
  return (
    <Wrapper>
      <Div>
      <p>Thanks for ordering, {formData.givenName}!</p>
      <Order>
        Your order of {formData.order} will be sent to your home in {formData.province}, Canada. Thanks for participating!
      </Order>
      </Div>
    </Wrapper>
  );
};

const Div = styled.div`
  border-radius: 10px;
  width: 800px;
  height: auto;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 30px;
`
const Order = styled.p`

`

const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

export default ConfirmationMsg;
