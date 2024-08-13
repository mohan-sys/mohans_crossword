import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <Component>
        <Title> velario's Crossword</Title>
    </Component>
  )
}

export default Header

const Component = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 10vh;
`

const Title = styled.h1`
    font-size: 3rem;
    color: purple;
`