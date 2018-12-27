import React from 'react'
import styled from 'styled-components'
import * as firebase from 'firebase'

const Drawer = styled.nav`
    height: 100%;
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 70%;
    max-width: 400px;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${p => p.show &&`
        transform: translateX(0);
    `}
`

const Button = styled.button`
    color: #fff;
    font-family: Cairo;
    font-size: 1em;
    background: transparent;
    padding: 1em 2em;
    cursor: pointer;
    &:hover {
        background: ${props => props.theme.background}
    }
`

const SideDrawer = props => {
    const resetState = () => {
        const stateRef = firebase.database().ref("state")
        stateRef.remove()
    }
    return (<Drawer show={props.show}>
        <Button onClick={resetState}>Reset</Button>
    </Drawer>)
}

export default SideDrawer
