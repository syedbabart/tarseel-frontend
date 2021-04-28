import React, {useState} from "react";
import './Login.css'
import {Link} from "react-router-dom";

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const loginUser = () => {
        console.log('Logged in')
        console.log(JSON.stringify(loginForm))
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
                                <input type={'text'} placeholder={'Username'} value={loginForm.username || ''}
                                       onChange={
                                           e => (setLoginForm({...loginForm, username: e.target.value}))
                                       }/>
                                <i className="far fa-user"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'password'} placeholder={'Password'} value={loginForm.password || ''}
                                       onChange={
                                           e => (setLoginForm({...loginForm, password: e.target.value}))
                                       }/>
                                <i className="fas fa-lock"/>
                            </div>
                        </div>

                        <div className={'login-bottom'}>
                            <span>Don't have an account? <Link to={'/sign-up'}>Get Registered</Link></span>
                            <div className={'login-button'}>
                                <button className={'btn btn--medium btn--outline'} onClick={loginUser}><i
                                    className="fas fa-arrow-right"/></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
