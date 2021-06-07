import React, {useEffect, useState} from 'react'
import './Signup.css'
import Button from "../Button";
import {Link, useHistory} from "react-router-dom";
import Map from "../Map";
import axios from "axios";
import {rootUrl} from "../../App";
import Snackbar from "../Snackbar";
import spinnerWhite from "../../assets/spinnerWhite.svg";
import {areasList} from "../../auth/data";

const Signup = () => {
    const [step, setStep] = useState(1)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState('Sign up snackbar message')
    const [isMapOpen, setIsMapOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const [areas, setAreas] = useState([])
    const [signupForm, setSignupForm] = useState({
        userType: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        area: '',
        address: '',
        corporateCustomer: {
            ntn: '',
            strn: '',
            regNumber: '',
            regAddress: '',
            discountedPrice: '',
            isApproved: false
        },
        employee: {
            cashBack: 0
        }
    })
    const [corporateForm, setCorporateForm] = useState({
        ntn: '',
        strn: '',
        regNumber: '',
        regAddress: '',
        discountedPrice: '',
        isApproved: false
    })

    const onMapClose = () => {
        setIsMapOpen(false)
    }

    useEffect(() => {
        fetchAreas()
        // eslint-disable-next-line
    }, [])

    const fetchAreas = () => {
        if (areasList === undefined) {
            const url = `${rootUrl}area/all`
            axios.get(url).then(
                response => {
                    generateAddressList(response.data.areas)
                },
                error => {
                    console.log(error)
                }
            )
        } else {
            generateAddressList(areasList)
        }
    }

    const generateAddressList = (areas) => {
        const areaList = areas.map(area =>
            <option key={area._id} value={area._id}>{area.name}</option>
        )
        setAreas(areaList)
    }

    const confirmMarkedAddress = (formattedAddress) => {
        setSignupForm({
            ...signupForm,
            address: formattedAddress
        })
        setIsMapOpen(false)
    }

    const handleUserType = (type) => {
        setSignupForm({
            ...signupForm,
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
                    setIsLoading(false)
                    history.push('/login')
                },
                error => {
                    setIsLoading(false)
                    console.log(error)
                })
    }

    const validateBioDataForm = () => {
        if (signupForm.name.length === 0 || signupForm.email.length === 0 || signupForm.password.length === 0 || signupForm.area.length === 0 || signupForm.phoneNumber.length === 0 || signupForm.address.length === 0 ) {
            onOpenSnackbar('Please fill in all the fields!')
        } else if (!(signupForm.email.includes('@'))) {
            onOpenSnackbar('Please enter valid email address!')
        } else {
            return true
        }
    }

    const submitCorporateForm = () => {
        if (corporateForm.ntn.length === 0 || corporateForm.strn.length === 0 || corporateForm.regNumber.length === 0 || corporateForm.regAddress.length === 0) {
            onOpenSnackbar('Please fill in all the fields!')
        } else {
            signupForm.corporateCustomer = corporateForm
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
                                        <option hidden>Choose your area</option>
                                        <option disabled>Areas of Service</option>
                                        {areas}
                                    </select>
                                </div>
                                <i className="fas fa-home"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Address'}
                                       value={signupForm.address}
                                       onChange={e => setSignupForm({...signupForm, address: e.target.value})}
                                       onClick={() => setIsMapOpen(true)}/>
                                <i className="fas fa-map-marker-alt"/>
                            </div>
                        </div>

                        <div className={'row button'}>
                            <Button buttonStyle={'btn--outline'} onClick={prevForm}><i
                                className="fas fa-arrow-left"/></Button>
                            {!isLoading && <Button buttonStyle={'btn--outline'} onClick={nextForm}><i
                                className="fas fa-arrow-right"/></Button>}
                            {isLoading && <div className={'btn btn--outline signup-spinner'}>
                                <img alt={'loading'} style={{width: '34px'}} src={spinnerWhite}/>
                            </div>}
                        </div>
                    </div>}

                    {step === 3 && <div className={'card-content'}>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'National Tax Number (NTN)'}
                                       value={corporateForm.ntn || ''}
                                       onChange={e => setCorporateForm({...corporateForm, ntn: e.target.value})}/>
                                <i className="far fa-building"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Sales Tax Registration Number (STRN)'}
                                       value={corporateForm.strn || ''}
                                       onChange={e => setCorporateForm({...corporateForm, strn: e.target.value})}/>
                                <i className="far fa-envelope"/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Registration Number'}
                                       value={corporateForm.regNumber || ''}
                                       onChange={e => setCorporateForm({...corporateForm, regNumber: e.target.value})}/>
                                <i className="far fa-address-card"/>
                            </div>
                            <div className={'input-field'}>
                                <input type={'text'} placeholder={'Registered Address'}
                                       value={corporateForm.regAddress || ''}
                                       onChange={e => setCorporateForm({...corporateForm, regAddress: e.target.value})}/>
                                <i className="fas fa-map-marker-alt"/>
                            </div>
                        </div>

                        <div className={'row button'}>
                            <Button buttonStyle={'btn--outline'} onClick={prevForm}><i
                                className="fas fa-arrow-left"/></Button>
                            {!isLoading && <Button buttonStyle={'btn--outline'} onClick={submitCorporateForm}><i
                                className="fas fa-arrow-right"/></Button>}
                            {isLoading && <div className={'btn btn--outline signup-spinner'}>
                                <img alt={'loading'} style={{width: '34px'}} src={spinnerWhite}/>
                            </div>}
                        </div>
                    </div>}
                </div>}

                <Map open={isMapOpen} onClose={onMapClose} modalTitle={"Mark your address"} modalButton={"Submit"}
                     onConfirm={confirmMarkedAddress}/>

            </div>
            {openSnackbar && <Snackbar message={message}/>}
        </>
    )
}
export default Signup;
