import React from 'react'
import './MainSection.css'
import {Button} from "./Button";
import {Link} from "react-router-dom";

const MainSection = () => {
    return (
        <>
            <section className={'hero-container'}>
                <span>What are you waiting for</span>
                <Button
                    component={Link}
                    to={'sign-up'}
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'
                >
                    REGISTER NOW
                </Button>
            </section>
        </>
    )
}

export default MainSection;
