import React, {useEffect, useState} from "react";
import Modal from "react-responsive-modal";
import styles from './AddUser.module.css'
import {rootUrl} from "../App";
import axios from "axios";
import spinnerBlue from "../assets/spinnerBlue.svg";
import Snackbar from "./Snackbar";
import Map from "./Map";
import {areasList} from "../auth/data";

const AddUser = (props) => {
    const [openMap, setOpenMap] = useState(false)
    const [areas, setAreas] = useState([])
    const [message, setMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [signupForm, setSignupForm] = useState({
        userType: '',
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        area: '',
        address: '',
        employee: {
            cashBack: 0
        }
    })

    useEffect(() => {
        setSignupForm({userType: 'employee'})
        fetchAreas()

        return () => {
            setIsLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    const fetchAreas = () => {
        if (areasList === undefined) {
            const url = `${rootUrl}area/all`
            axios.get(url).then(
                response => {
                    generateAreasList(response.data.areas)
                },
                error => {
                    console.log(error)
                }
            )
        } else {
            generateAreasList(areasList)
        }
    }

    const generateAreasList = (areas) => {
        const areaList = areas.map(area =>
            <option key={area._id} value={area._id}>{area.name}</option>
        )
        setAreas(areaList)
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
        if (validateBioDataForm()) {
            setIsLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            axios.post(rootUrl + 'user/signup', signupForm, config)
                .then(response => {
                        setIsLoading(false)
                        props.onClose()
                        props.reload()
                    },
                    error => {
                        setIsLoading(false)
                        console.log(error)
                    })
        }
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

    const onOpenMap = () => {
        setOpenMap(true)
    }

    const onCloseMap = () => {
        setOpenMap(false)
    }

    const confirmMarkedAddress = (formattedAddress) => {
        setSignupForm({
            ...signupForm,
            address: formattedAddress
        })
        setOpenMap(false)
    }

    const onOpenSnackbar = (message) => {
        setOpenSnackbar(true)
        setMessage(message)
        setTimeout(
            () => setOpenSnackbar(false),
            3000
        )
    }

    return (
        <Modal open={props.open} onClose={props.onClose} center>
            <h2 className={styles.cardHeader}>Add new Employee</h2>

            <section className={styles.addUserContent}>
                <div className={styles.row}>
                    <div className={styles.inputFieldWrap}>
                        <input placeholder={'Name'} type={'text'} value={signupForm.name || ''}
                               onChange={e => setSignupForm({...signupForm, name: e.target.value})}/>
                        <i className="far fa-user"/>
                    </div>
                    <div className={styles.inputFieldWrap}>
                        <input placeholder={'Email'} type={'email'} value={signupForm.email || ''}
                               onChange={e => setSignupForm({...signupForm, email: e.target.value})}/>
                        <i className="far fa-envelope"/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputFieldWrap}>
                        <input placeholder={'Password'} type={'password'} value={signupForm.password || ''}
                               onChange={e => setSignupForm({...signupForm, password: e.target.value})}/>
                        <i className="fas fa-lock"/>
                    </div>
                    <div className={styles.inputFieldWrap}>
                        <input placeholder={'Phone Number'} type={'text'} value={signupForm.phoneNumber || ''}
                               onChange={onNumberChangeHandler}/>
                        <i className="fas fa-phone"/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputFieldWrap}>
                        <select value={signupForm.area || ''}
                                onChange={e => setSignupForm({...signupForm, area: e.target.value})}>
                            <option hidden>Choose your area</option>
                            <option disabled>Areas of Service</option>
                            {areas}
                        </select>
                        <i className="fas fa-home"/>
                    </div>
                    <div className={styles.inputFieldWrap}>
                        <input placeholder={'Address'} type={'text'} value={signupForm.address || ''}
                               onChange={e => setSignupForm({...signupForm, address: e.target.value})}
                                onClick={onOpenMap} />
                        <i className="fas fa-map-marker-alt"/>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    {isLoading && <button className={`${styles.modalButton} ${styles.addModalSpinner}`}><img
                        alt={'loading'} src={spinnerBlue}/></button>}
                    {!isLoading &&
                    <button className={`${styles.modalButton}`} onClick={submitBioData}>Add Employee</button>}
                </div>

            </section>

            {openMap && <Map open={openMap} onClose={onCloseMap} modalTitle={"Mark address"} modalButton={"Submit"}
                  onConfirm={confirmMarkedAddress}/>}

            {openSnackbar && <Snackbar message={message}/>}
        </Modal>
    )
}
export default AddUser
