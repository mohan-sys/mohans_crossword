import React from 'react';
import styled from 'styled-components';
import CrosswordGrid from './CrosswordGrid';

function MainContent({crossword}) {

    
  return (
    <Container>
        < CrosswordGrid crossword = {crossword}/>
    </Container>
  )
}

export default MainContent

const Container = styled.div`
    width = 100vw;
    height = 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    padding-bottom: 29px;
`