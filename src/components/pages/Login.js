import React from "react";
import './Login.css'
import Button from "../Button";

const Login = () => {
    const loginUser = () => {
        console.log('Logged in')
    }
    return (
        <>
            <div className={'login-container'}>
                <div className={'card'}>
                    <div className={'card-header'}>
                        <span>Login</span>
                    </div>

                    <div className={'card-content'}>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Username'}/>
                                <i className="far fa-user"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'password'} placeholder={'Password'}/>
                                <i className="fas fa-lock"/>
                            </div>
                        </div>
                        <div className={'login-button'}>
                            <button className={'btn btn--medium btn--outline'} onClick={loginUser}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
