import React from 'react';
import styled from 'styled-components';

function Feedback() {
  return (
    <FeedbackContainer>
      <h2>Leave Your Feedback</h2>
      <p>We value your feedback! Please click the link below to fill out our feedback form:</p>
      <FeedbackLink href="https://strathsci.qualtrics.com/jfe/form/SV_2hPgH75huXJHn3U" target="_blank" rel="noopener noreferrer">
        Go to Feedback Form
      </FeedbackLink>
    </FeedbackContainer>
  );
}

export default Feedback;

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

const FeedbackLink = styled.a`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;