import React from "react";
import Modal from "react-responsive-modal";
import styles from "./AddProduct.module.css";

const UserPopup = (props) => {

    const onClose = () => {
        props.onClose()
    }

    return (
        <Modal open={props.open} onClose={onClose} center>
            <h2 className={styles.cardHeader}>Add User</h2>

            <section className={styles.addProductContent}>
                <div className={styles.row}>

                </div>

            </section>
        </Modal>
    )
}
export default UserPopup
