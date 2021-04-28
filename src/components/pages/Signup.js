import React, {useState} from 'react'
import './Signup.css'
import Button from "../Button";
import MapView from "../MapView";
import {Link} from "react-router-dom";

const Signup = () => {
    const [step, setStep] = useState(1)
    const [isMapOpen, setIsMapOpen] = useState(false)
    const [signupForm, setSignupForm] = useState({
        userType: '',
        name: null,
        email: '',
        phNumber: '',
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

    const confirmMarkedAddress = (coords, address) => {
        console.log(address)
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

    const submitBioData = () => {
        console.log(JSON.stringify(signupForm))
    }

    const nextForm = () => {
        if (signupForm.userType === 'corporate') {
            setStep(3)
        } else {
            submitBioData()
        }
    }

    const prevForm = () => {
        setStep(step - 1)
    }

    return (
        <>
            <div className={'signup-container'}>
                {!isMapOpen && <div className={'card'}>
                    <div className={'card-header'}>
                        <span>Sign up</span>
                    </div>

                    {step === 1 && <div className={'card-content'}>
                        <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('customer')}>Sign up as
                            Customer <i
                                className="fas fa-chevron-right"/></Button>
                        <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('corporate')}>Sign up as
                            Corporate <i
                                className="fas fa-chevron-right"/></Button>
                        <Button buttonStyle={'btn--outline'} onClick={() => handleUserType('employee')}>Sign up as
                            Employee <i
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
                                <input type={'text'} placeholder={'Phone'} value={signupForm.phNumber || ''}
                                       onChange={e => setSignupForm({...signupForm, phNumber: e.target.value})}/>
                                <i className="fas fa-phone-alt"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'password'} placeholder={'Password'} value={signupForm.password || ''}
                                       onChange={e => setSignupForm({...signupForm, password: e.target.value})}/>
                                <i className="fas fa-lock"/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <div>
                                    <select value={signupForm.area || ''}
                                            onChange={e => setSignupForm({...signupForm, area: e.target.value})}>
                                        {/*<option disabled defaultValue={'Area'} hidden>Area</option>*/}
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
                            <Button buttonStyle={'btn--outline'} onClick={nextForm}><i
                                className="fas fa-arrow-right"/></Button>
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
                            <Button buttonStyle={'btn--outline'} onClick={submitBioData}><i
                                className="fas fa-arrow-right"/></Button>
                        </div>
                    </div>}
                </div>}

                {isMapOpen && <div className={'card'}>
                    <div className={'map-container'}>
                        <MapView mapHandler={confirmMarkedAddress}/>
                    </div>
                </div>}

            </div>
        </>
    )
}

export default Signup;
