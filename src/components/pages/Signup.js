import React, {useState} from 'react'
import './Signup.css'
import {Button} from "../Button";

const Signup = () => {
    const [step, setStep] = useState(1)
    const [signupForm, setSignupForm] = useState({
        userType: '',
        name: '',
        email: '',
        phNumber: '',
        area: '',
        address: '',
        ntn: '',
        strn: '',
        regNumber: '',
        regAddress: ''
    })

    const handleUserType = (type) => {
        setSignupForm({
            userType: type
        })
        setStep(2)
        console.log(signupForm.userType)
    }

    const nextForm = () => {
        if (step < 3) {
            setStep(step + 1)
        }
    }

    const prevForm = () => {
        setStep(step - 1)
    }

    return (
        <>
            <div className={'signup-container'}>
                <div className={'card'}>
                    <div className={'card-header'}>
                        <span>Sign up</span>
                    </div>

                    {step === 1 && <div className={'card-content'}>
                        <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('customer')}>Sign up as Customer <i
                            className="fas fa-chevron-right"/></Button>
                        <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('corporate')}>Sign up as Corporate <i
                            className="fas fa-chevron-right"/></Button>
                        <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('employee')}>Sign up as Employee <i
                            className="fas fa-chevron-right"/></Button>
                    </div>}

                    {step === 2 && <div className={'card-content'}>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Name'}/>
                                <i className="far fa-user"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'email'} placeholder={'Email'}/>
                                <i className="far fa-envelope"/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Phone'}/>
                                <i className="fas fa-phone"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'password'} placeholder={'Password'}/>
                                <i className="fas fa-lock"/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <div>
                                    <select>
                                        <option disabled selected={true} hidden>Area</option>
                                        <option value={'Jinnah Garden, Islamabad'}>Jinnah Garden, Islamabad</option>
                                        <option value={'River Garden, Islamabad'}>River Garden, Islamabad</option>
                                        <option value={'wan Garden, Islamabad'}>Swan Garden, Islamabad</option>
                                    </select>
                                </div>
                                <i className="far fa-address-card"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Address'}/>
                                <i className="fas fa-map-marker-alt"/>
                            </div>
                        </div>
                        <div className={'row button'}>
                            <Button buttonStyle={'btn--outline'} onClick={prevForm}><i
                                className="fas fa-arrow-left"/></Button>
                            <Button buttonStyle={'btn--outline'} onClick={nextForm}><i className="fas fa-arrow-right"/></Button>
                        </div>
                    </div>}

                    {step === 3 && <div className={'card-content'}>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'National Tax Number (NTN)'}/>
                                <i className="far fa-building"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Sales Tax Registration Number (STRN)'}/>
                                <i className="far fa-envelope"/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Registration Number'}/>
                                <i className="far fa-address-card"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Registered Address'}/>
                                <i className="fas fa-map-marker-alt"/>
                            </div>
                        </div>
                        <div className={'row button'}>
                            <Button buttonStyle={'btn--outline'} onClick={prevForm}><i
                                className="fas fa-arrow-left"/></Button>
                            <Button buttonStyle={'btn--outline'} onClick={nextForm}><i className="fas fa-arrow-right"/></Button>
                        </div>
                    </div>}

                </div>
            </div>
        </>
    )
}

export default Signup;
