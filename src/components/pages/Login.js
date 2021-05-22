import React, {useState} from "react";
import './Login.css'
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Snackbar from "../Snackbar";
import {rootUrl} from "../../App";

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()

    const loginUser = (event) => {
        event.preventDefault()
        console.log(loginForm)
        if (isFormInvalid()) {
            onOpenSnackbar('Please fill in all the fields!')
        }
        else if (!(loginForm.email.includes('@'))) {
            onOpenSnackbar('Please enter valid email address!')
        }
        else {
            const url = rootUrl + 'user/login'
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post(url, loginForm, config)
                .then(
                    response => {
                        console.log(response)
                        localStorage.setItem('token', response.data.token)
                        history.push('/')
                    },
                    error => {
                        console.log(error)
                        if (error.request.status === 401) {
                            onOpenSnackbar('Invalid Credentials!')
                        } else if (error.request.status === 500) {
                            onOpenSnackbar('Something went wrong! Please try again.')
                        }

                    })
        }
    }

    const onOpenSnackbar = (message) => {
        setOpenSnackbar(true)
        setMessage(message)
        setTimeout(
            () => setOpenSnackbar(false),
            3000
        )
    }

    const isFormInvalid = () => {
        return (loginForm.email.length === 0 || loginForm.password.length === 0)
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
                                <input type={'email'} placeholder={'Email'} value={loginForm.email || ''}
                                       onChange={
                                           e => (setLoginForm({...loginForm, email: e.target.value}))
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
            {openSnackbar && <Snackbar message={message}/>}
        </>
    )
}
export default Login;
