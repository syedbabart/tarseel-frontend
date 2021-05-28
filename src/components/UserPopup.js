import React, {useEffect, useState} from "react";
import Modal from "react-responsive-modal";
import styles from "./UserPopup.module.css";
import Profile from "./pages/Profile";
import spinnerBlue from "../assets/spinnerBlue.svg";
import {rootUrl} from "../App";
import axios from "axios";
import auth from "../auth/auth";

const UserPopup = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        return () => setIsLoading(false)
        // eslint-disable-next-line
    }, [])

    const onDeleteUser = () => {
        setIsLoading(true)
        const url = `${rootUrl}user/${props.selectedUser._id}`
        axios.delete(url, auth.getHeader()).then(
            response => {
                props.onClose()
                props.reload()
            },
            error => {
                console.log(error)
                console.log(setIsLoading(false))
            }
        )
    }

    return (
        <Modal open={props.open} onClose={props.onClose} center>
            <Profile viewer={'admin'} selectedUser={props.selectedUser}/>
            <div className={styles.modalFooter}>
                {isLoading ?
                    (<button className={`${styles.modalButton} ${styles.addModalSpinner}`}><img
                        alt={'loading'} src={spinnerBlue}/></button>)
                    :
                    (<button className={`${styles.modalButton}`} onClick={onDeleteUser}>Delete User</button>)}
            </div>
        </Modal>
    )
}
export default UserPopup
