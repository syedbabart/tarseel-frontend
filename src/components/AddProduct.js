import React, {useEffect, useState} from "react";
import Modal from "react-responsive-modal";
import styles from './AddProduct.module.css'
import axios from "axios";
import {rootUrl} from "../App";
import auth from "../auth/auth";

const AddProduct = (props) => {
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

    const onAddProduct = () => {
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
            }
        )
    }

    const onDeleteProduct = () => {
        const url = `${rootUrl}product/${currentProduct._id}`
        axios.delete(url, auth.getHeader()).then(
            response => {
                props.onClose()
                props.fetchProducts()
            },
            error => {
                console.log(error)
            }
        )
    }

    const onUpdateProduct = () => {
        const url = `${rootUrl}product/${currentProduct._id}`
        axios.patch(url, currentProduct, auth.getHeader()).then(
            response => {
                props.onClose()
                props.fetchProducts()
            },
            error => {
                console.log(error)
            }
        )
    }

    return (
        <Modal open={props.open} onClose={props.onClose} center showCloseIcon={props.modalType === 'edit'}>
            {props.modalType === 'add' && <h2 className={styles.cardHeader}>Add new product</h2>}
            {props.modalType === 'edit' && <h2 className={styles.cardHeader}>Edit product</h2>}
            <div className={styles.addProductContent}>
                <input className={styles.cardInput} placeholder={'Name'} value={currentProduct.name} onChange={e => {setCurrentProduct({...currentProduct, name: e.target.value})}}/>
                <input className={styles.cardInput} placeholder={'Amount'} value={currentProduct.amount} onChange={e => {setCurrentProduct({...currentProduct, amount: e.target.value})}}/>
                <input className={styles.cardInput} placeholder={'Price'} value={currentProduct.price} onChange={e => {setCurrentProduct({...currentProduct, price: e.target.value})}}/>
            </div>

            {props.modalType === 'add' && <div className={styles.modalFooter}>
                <button className={styles.modalButton} onClick={props.onClose}>Cancel</button>
                <button className={styles.modalButton} onClick={onAddProduct}>Add Product <i className="fas fa-plus"/></button>
            </div>}

            {props.modalType === 'edit' && <div className={styles.modalFooter}>
                <button className={styles.modalButton} onClick={onDeleteProduct}>Delete <i className="fas fa-trash-alt"/></button>
                <button className={styles.modalButton} onClick={onUpdateProduct}>Update Product <i className="fas fa-upload"/></button>
            </div>}
        </Modal>
    )
}
export default AddProduct
