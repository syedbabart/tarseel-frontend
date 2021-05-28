import React from "react";
import Modal from "react-responsive-modal";
import styles from "./UserPopup.module.css";
import Profile from "./pages/Profile";

const UserPopup = (props) => {

    const onClose = () => {
        props.onClose()
    }

    return (
        <Modal open={props.open} onClose={onClose} center>
            <Profile viewer={'admin'} selectedUser={props.selectedUser}/>
        </Modal>
    )
}
export default UserPopup
