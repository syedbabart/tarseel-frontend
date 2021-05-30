import React, {useEffect, useState} from "react";
import Modal from "react-responsive-modal";
import styles from './AddProduct.module.css'
import axios from "axios";
import {rootUrl} from "../App";
import auth from "../auth/auth";
import spinnerBlue from '../assets/spinnerBlue.svg'
import Snackbar from "./Snackbar";

const AddProduct = (props) => {
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [adding, setAdding] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({
        _id: '',
        name: '',
        amount: '',
        price: ''
    })

    useEffect(() => {
        setCurrentProduct({
            _id: props.currentProduct._id,
            name: props.currentProduct.name,
            amount: props.currentProduct.amount,
            price: props.currentProduct.price
        })
    }, [props.currentProduct])

    useEffect(() => {
        return () => {
            setDeleteLoading(false)
            setUpdating(false)
            setAdding(false)
        }
        // eslint-disable-next-line
    }, [])

    const onAddProduct = () => {
        if (validateForm()) {
            setAdding(true)
            const url = rootUrl + 'product/add'
            const body = {
                name: currentProduct.name,
                amount: currentProduct.amount,
                price: currentProduct.price
            }
            axios.post(url, body, auth.getHeader()).then(
                response => {
                    props.onClose()
                    props.fetchProducts()
                },
                error => {
                    console.log(error)
                    setAdding(false)
                }
            )
        }
    }

    const onDeleteProduct = () => {
            setDeleteLoading(true)
            const url = `${rootUrl}product/${currentProduct._id}`
            axios.delete(url, auth.getHeader()).then(
                response => {
                    props.onClose()
                    props.fetchProducts()
                },
                error => {
                    console.log(error)
                    setDeleteLoading(false)
                }
            )
    }

    const onUpdateProduct = () => {
        if (validateForm()) {
            setUpdating(true)
            const url = `${rootUrl}product/${currentProduct._id}`
            axios.patch(url, currentProduct, auth.getHeader()).then(
                response => {
                    props.onClose()
                    props.fetchProducts()
                },
                error => {
                    console.log(error)
                    setUpdating(false)
                }
            )
        }

    }

    const onOpenSnackbar = () => {
        setOpenSnackbar(true)
        setTimeout(
            () => setOpenSnackbar(false),
            3000
        )

    }

    const validateForm = () => {
        if (currentProduct.name.length === 0 || currentProduct.amount.length === 0 || currentProduct.price.length === 0) {
            onOpenSnackbar()
            return false
        } else {
            return true
        }
    }



    return (
        <Modal open={props.open} onClose={props.onClose} center showCloseIcon={props.modalType === 'edit'}>
            {props.modalType === 'add' && <h2 className={styles.cardHeader}>Add new product</h2>}
            {props.modalType === 'edit' && <h2 className={styles.cardHeader}>Edit product</h2>}
            <div className={styles.addProductContent}>
                <input className={styles.cardInput} placeholder={'Name'} value={currentProduct.name} onChange={e => {
                    setCurrentProduct({...currentProduct, name: e.target.value})
                }}/>
                <input className={styles.cardInput} placeholder={'Amount'} value={currentProduct.amount}
                       onChange={e => {
                           setCurrentProduct({...currentProduct, amount: e.target.value})
                       }}/>
                <input className={styles.cardInput} placeholder={'Price'} value={currentProduct.price} onChange={e => {
                    setCurrentProduct({...currentProduct, price: e.target.value})
                }}/>
            </div>

            {props.modalType === 'add' && <div className={styles.modalFooter}>
                <button className={styles.modalButton} onClick={props.onClose}>Cancel</button>
                {!adding &&
                <button className={styles.modalButton} onClick={onAddProduct}>Add Product <i className="fas fa-plus"/>
                </button>}
                {adding &&
                <button className={`${styles.modalButton} ${styles.addModalSpinner}`} onClick={onAddProduct}><img
                    alt={'loading'} src={spinnerBlue}/></button>}
            </div>}

            {props.modalType === 'edit' && <div className={styles.modalFooter}>
                {deleteLoading &&
                <button className={`${styles.modalButton} ${styles.addModalSpinner}`}><img
                    alt={'loading'} src={spinnerBlue}/></button>}
                {!deleteLoading && <button className={styles.modalButton} onClick={onDeleteProduct}>Delete <i
                    className="fas fa-trash-alt"/></button>}

                {updating &&
                <button className={`${styles.modalButton} ${styles.addModalSpinner}`}><img
                    alt={'loading'} src={spinnerBlue}/></button>}
                {!updating && <button className={styles.modalButton} onClick={onUpdateProduct}>Update Product <i
                    className="fas fa-upload"/></button>}
            </div>}

            {openSnackBar && <Snackbar message={'Please fill in all the fields!'}/>}
        </Modal>
    )
}

export default AddProduct
