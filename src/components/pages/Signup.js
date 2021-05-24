import React, {useEffect, useState} from 'react'
import './Signup.css'
import Button from "../Button";
import {Link, useHistory} from "react-router-dom";
import Map from "../Map";
import axios from "axios";
import {rootUrl} from "../../App";
import Snackbar from "../Snackbar";
import spinnerWhite from "../../assets/spinnerWhite.svg";

const Signup = () => {
    const [step, setStep] = useState(1)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState('Sign up snackbar message')
    const [isMapOpen, setIsMapOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const [signupForm, setSignupForm] = useState({
        userType: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        area: '',
        address: '',
        latitude: '',
        longitude: '',
        ntn: '',
        strn: '',
        regNumber: '',
        regAddress: ''
    })

    const onMapClose = () => {
        setIsMapOpen(false)
    }

    useEffect(() => {
        setSignupForm({...signupForm, address: 'Islamabad Capital Territory, Pakistan'})
    }, [])

    const confirmMarkedAddress = (coords) => {
        setSignupForm({
            ...signupForm,
            longitude: coords.longitude,
            latitude: coords.latitude
        })
        setIsMapOpen(false)
    }

    const handleUserType = (type) => {
        setSignupForm({
            userType: type
        })
        setStep(2)
    }

    const onNumberChangeHandler = (event) => {
        const regExp = /^[0-9\b]+$/
        if (event.target.value === '' || regExp.test(event.target.value)) {
            setSignupForm({
                ...signupForm,
                phoneNumber: event.target.value
            })
        }
    }

    const submitBioData = () => {
        setIsLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.post(rootUrl + 'user/signup', signupForm, config)
            .then(response => {
                    console.log(response)
                    setIsLoading(false)
                    history.push('/login')
                },
                error => {
                    setIsLoading(false)
                    console.log(error)
                })
    }

    const validateBioDataForm = () => {
        if (signupForm.name === undefined || signupForm.email === undefined || signupForm.password === undefined || signupForm.area === undefined || signupForm.phoneNumber === undefined) {
            onOpenSnackbar('Please fill in all the fields!')
        } else if (!(signupForm.email.includes('@'))) {
            onOpenSnackbar('Please enter valid email address!')
        } else {
            return true
        }
    }

    const submitCorporateForm = () => {
        console.log(signupForm)
        if (signupForm.ntn === undefined || signupForm.strn === undefined || signupForm.regNumber === undefined || signupForm.regAddress === undefined) {
            onOpenSnackbar('Please fill in all the fields!')
        } else {
            submitBioData()
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

    const nextForm = () => {
        const isFormValid = validateBioDataForm()
        if (isFormValid && signupForm.userType === 'corporate') {
            setStep(3)
        } else if (isFormValid) {
            submitBioData()
        }
    }

    const prevForm = () => {
        setStep(step - 1)
    }

    return (
        <>
            <form>
                <div className={'signup-container'}>
                    {!isMapOpen && <div className={'card'}>
                        <div className={'card-header'}>
                            <span>Sign up</span>
                        </div>

                        {step === 1 && <div className={'card-content'}>
                            <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('customer')}>Sign up as
                                Regular Customer <i
                                    className="fas fa-chevron-right"/></Button>
                            <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('corporate')}>Sign up as
                                Corporate Customer <i
                                    className="fas fa-chevron-right"/></Button>
                            <span>Already have an account? <Link to={'/login'}>Login</Link></span>
                        </div>}

                        {step === 2 && <div className={'card-content'}>
                            <div className={'row'}>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'Name'} value={signupForm.name || ''}
                                           onChange={e => setSignupForm({...signupForm, name: e.target.value})}/>
                                    <i className="far fa-user"/>
                                </div>
                                <div className={'input-field'}>
                                    <input type={'email'} placeholder={'Email'} value={signupForm.email || ''}
                                           onChange={e => setSignupForm({...signupForm, email: e.target.value})}/>
                                    <i className="far fa-envelope"/>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'input-field'}>
                                    <input type={'password'} placeholder={'Password'} value={signupForm.password || ''}
                                           onChange={e => setSignupForm({...signupForm, password: e.target.value})}/>
                                    <i className="fas fa-lock"/>
                                </div>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'Phone'} value={signupForm.phoneNumber || ''}
                                           onChange={onNumberChangeHandler}/>
                                    <i className="fas fa-phone-alt"/>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'input-field'}>
                                    <div>
                                        <select value={signupForm.area || ''}
                                                onChange={e => setSignupForm({...signupForm, area: e.target.value})}>
                                            <option disabled>Areas of Service</option>
                                            <option hidden>Choose your area</option>
                                            <option defaultChecked value={'Jinnah Garden, Islamabad'}>Jinnah Garden,
                                                Islamabad
                                            </option>
                                            <option value={'River Garden, Islamabad'}>River Garden, Islamabad</option>
                                            <option value={'Swan Garden, Islamabad'}>Swan Garden, Islamabad</option>
                                        </select>
                                    </div>
                                    <i className="far fa-address-card"/>
                                </div>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'Address'}
                                        // value={`Lat: ${signupForm.latitude}, Long: ${signupForm.longitude}` || ''}
                                           onChange={e => setSignupForm({...signupForm, address: e.target.value})}
                                           onFocus={() => setIsMapOpen(true)}/>
                                    <i className="fas fa-map-marker-alt"/>
                                </div>
                            </div>

                            <div className={'row button'}>
                                <Button buttonStyle={'btn--outline'} onClick={prevForm}><i
                                    className="fas fa-arrow-left"/></Button>
                                {!isLoading && <Button buttonStyle={'btn--outline'} onClick={nextForm}><i
                                    className="fas fa-arrow-right"/></Button>}
                                {isLoading && <div style={{padding: '0 12px', height: '45px'}}
                                                   className={'btn btn--outline signup-spinner'}><img
                                    style={{width: '34px'}} src={spinnerWhite}/></div>}
                            </div>
                        </div>}

                        {step === 3 && <div className={'card-content'}>
                            <div className={'row'}>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'National Tax Number (NTN)'}
                                           value={signupForm.ntn}
                                           onChange={e => setSignupForm({...signupForm, ntn: e.target.value})}/>
                                    <i className="far fa-building"/>
                                </div>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'Sales Tax Registration Number (STRN)'}
                                           value={signupForm.strn}
                                           onChange={e => setSignupForm({...signupForm, strn: e.target.value})}/>
                                    <i className="far fa-envelope"/>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'Registration Number'}
                                           value={signupForm.regNumber}
                                           onChange={e => setSignupForm({...signupForm, regNumber: e.target.value})}/>
                                    <i className="far fa-address-card"/>
                                </div>
                                <div className={'input-field'}>
                                    <input type={'text'} placeholder={'Registered Address'}
                                           value={signupForm.regAddress}
                                           onChange={e => setSignupForm({...signupForm, regAddress: e.target.value})}/>
                                    <i className="fas fa-map-marker-alt"/>
                                </div>
                            </div>

                            <div className={'row button'}>
                                <Button buttonStyle={'btn--outline'} onClick={prevForm}><i
                                    className="fas fa-arrow-left"/></Button>
                                {!isLoading && <Button buttonStyle={'btn--outline'} onClick={submitCorporateForm}><i
                                    className="fas fa-arrow-right"/></Button>}
                                {isLoading && <div style={{padding: '0 12px', height: '45px'}}
                                                   className={'btn btn--outline signup-spinner'}><img
                                    style={{width: '34px'}} src={spinnerWhite}/></div>}
                            </div>
                        </div>}
                    </div>}

                    <Map open={isMapOpen} onClose={onMapClose} modalTitle={"Mark your address"} modalButton={"Submit"}
                         onConfirm={confirmMarkedAddress}/>

                </div>
            </form>
            {openSnackbar && <Snackbar message={message}/>}
        </>
    )
}
export default Signup;
