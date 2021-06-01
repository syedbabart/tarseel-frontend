import React, {useEffect, useState} from "react";
import Modal from "react-responsive-modal";
import {rootUrl} from "../App";
import axios from "axios";
import styles from './PlaceOrder.module.css'
import spinnerBlue from "../assets/spinnerBlue.svg";
import Map from "./Map";
import auth from "../auth/auth";
import {areasList} from "../auth/data";

const PlaceOrder = (props) => {
    const [areas, setAreas] = useState([])
    const [open, setOpen] = useState(false)
    const [grandTotal, setGrandTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [orderForm, setOrderForm] = useState({
        products: {},
        deliveryArea: '',
        deliveryAddress: ''
    })

    useEffect(() => {
        fetchAreas()
        setSelectedOrders()
        return () => setIsLoading(false)
        // eslint-disable-next-line
    }, [])

    const setSelectedOrders = () => {
        const orders = props.selectedOrders
        let sum = 0;
        let products = []
        for (let i = 0; i < orders.length; i++) {
            sum += orders[i].productTotal
            products.push({
                productId: orders[i]._id,
                quantity: orders[i].quantity
            })
        }
        setGrandTotal(sum)
        setOrderForm({
            ...orderForm,
            products: products
        })
    }

    const fetchAreas = () => {
        if (areasList) {
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

    const removeFromCart = () => {
        for (let i = 0; i < props.selectedOrders.length; i++) {
            localStorage.removeItem(props.selectedOrders[i]._id)
        }
    }

    const onPlaceOrder = () => {
        if (validateOrderForm()) {
            setIsLoading(true)
            const url = `${rootUrl}order/add`
            axios.post(url, orderForm, auth.getHeader()).then(
                response => {
                    removeFromCart()
                    props.onClose()
                    props.reload()
                    props.openSnackbar('Order placed successfully')
                },
                error => {
                    console.log(error)
                    setIsLoading(false)
                }
            )
        }
    }

    const confirmMarkedAddress = (formattedAddress) => {
        setOrderForm({
            ...orderForm,
            deliveryAddress: formattedAddress
        })
        setOpen(false)
    }

    const validateOrderForm = () => {
        if (orderForm.deliveryAddress.length === 0 || orderForm.deliveryArea.length === 0) {
            props.openSnackbar('Please fill in all the fields!')
            return false
        } else {
            return true
        }
    }

    const onMapOpen = () => {
        setOpen(true)
    }

    const onMapClose = () => {
        setOpen(false)
    }

    return (
        <Modal open={props.open} onClose={props.onClose} showCloseIcon={false} center>
            <h2 className={styles.cardHeader}>Place Order</h2>

            <section className={styles.cardContent}>
                <div className={styles.orderPrice}>
                    <div>Total Price</div>
                    <span className={styles.totalPrice}>Rs. {grandTotal}</span>
                </div>

                <div className={styles.inputFieldWrap}>
                    <select value={orderForm.deliveryArea}
                            onChange={event => setOrderForm({...orderForm, deliveryArea: event.target.value})}>
                        <option hidden>Choose your area</option>
                        <option disabled>Areas of Service</option>
                        {areas}
                    </select>
                    <i className="fas fa-home"/>
                </div>

                <div className={styles.inputFieldWrap}>
                    <input placeholder={'Delivery Address'} type={'text'} onClick={onMapOpen}
                           value={orderForm.deliveryAddress}
                           onChange={event => setOrderForm({...orderForm, deliveryAddress: event.target.value})}
                    />
                    <i className="fas fa-map-marker-alt"/>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.modalButton} onClick={props.onClose}>Cancel</button>

                    {isLoading ?
                        (<button className={`${styles.modalButton} ${styles.addModalSpinner}`}><img
                            alt={'loading'} src={spinnerBlue}/></button>) :
                        (<button className={styles.modalButton} onClick={onPlaceOrder}>Confirm Order</button>)
                    }
                </div>
            </section>

            {open &&
            <Map open={open} onClose={onMapClose} modalTitle={"Confirm delivery address"} modalButton={"Place Order"}
                 onConfirm={confirmMarkedAddress}/>}

        </Modal>
    )
}
export default PlaceOrder
