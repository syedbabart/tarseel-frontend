import React, {useEffect, useState} from "react";
import './Login.css'
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Snackbar from "../Snackbar";
import {rootUrl} from "../../App";
import auth from "../../auth/auth";
import spinnerWhite from '../../assets/spinnerWhite.svg'

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
            return () => setIsLoading(false)
        },
        // eslint-disable-next-line
        [])

    const loginUser = (event) => {
        event.preventDefault()
        if (isFormInvalid()) {
            onOpenSnackbar('Please fill in all the fields!')
        } else if (!(loginForm.email.includes('@'))) {
            onOpenSnackbar('Please enter valid email address!')
        } else {
            setIsLoading(true)
            const url = rootUrl + 'user/login'
            axios.post(url, loginForm)
                .then(
                    response => {
                        localStorage.setItem('token', response.data.token)
                        axios.get(`${rootUrl}user`, auth.getHeader()).then(
                            data => {
                                localStorage.setItem('userType', data.data.user['userType'])
                                props.rerender()
                                history.push('/')
                            },
                            err => {
                                console.log(err)
                                setIsLoading(false)
                            }
                        )
                    })
                .catch(error => {
                    if (error.request.status === 401) {
                        onOpenSnackbar('Invalid Credentials!')
                    } else if (error.request.status === 500) {
                        onOpenSnackbar('Something went wrong! Please try again.')
                    }
                    setIsLoading(false)
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
                                {!isLoading && <button className={'btn btn--medium btn--outline'} onClick={loginUser}><i
                                    className="fas fa-arrow-right"/></button>}
                                {isLoading && <button className={'btn btn--medium btn--outline login-spinner'}>
                                    <img alt={'loading'} style={{width: '34px'}} src={spinnerWhite}/></button>}
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
