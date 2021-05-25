import React, {useEffect, useState} from "react";
import './Orders.css'
import Map from "../Map";
import axios from "axios";
import {rootUrl} from "../../App";



const Orders = () => {
    const [open, setOpen] = useState(false);
    const [productList, setProductList] = useState([])
    let products = []

    useEffect(() => {
        axios.get(rootUrl + 'product/all').then(
            response => {
                products = (response.data.products)
                generateProductList(response.data.products)
            },
            error => {
                console.log(error)
            }
        )
    },[])


    const onMapClose = () => {
        setOpen(false)
    }

    const onPlaceOrder = () => {
        setOpen(false)
        console.log("Order has been placed.")
    }

    const generateProductList = (products) => {
        const pList = products.map(product => {
                if (localStorage.getItem(product._id)) {
                    return (
                        <div className={'cart-item'} key={product._id}>
                            <div className={'item-info'}>
                                <div>{product.name}</div>
                                <h4>{product.amount}</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                    hendrerit risus, sed porttitor quam.
                                </p>
                                <span>Rs. {product.price}</span>
                            </div>
                            <div className={'item-quantity'}>
                                <div>Quantity</div>
                                <p>{localStorage.getItem(product._id)}</p>
                            </div>
                            <div className={'total'}>
                                <div>Total</div>
                                <p>Rs. {product.price * (JSON.parse(localStorage.getItem(product._id)))}</p>
                            </div>
                            <div className={'delete-item'} onClick={() => deleteItem(product._id)}><i
                                className="fas fa-trash-alt"/></div>
                            <div className={'confirm-order'} onClick={() => onCheckOut()}>Check out</div>
                        </div>
                    )
                }
            }
        )
        setProductList(pList)
    }


    const deleteItem = (name) => {
        localStorage.removeItem(name)
        generateProductList(products)
    }

    const onCheckOut = () => {
        setOpen(true)
    }

    return (
        <section className={'cart-section-container'}>
            <h1 className={'product-title'}>Cart</h1>

            {productList}

            {!productList && <div className={'cart-item'}>
                Cart is empty
            </div>}

            <Map open={open} onClose={onMapClose} modalTitle={"Confirm delivery address"} modalButton={"Place Order"} onConfirm={onPlaceOrder}/>

        </section>
    )
}
export default Orders
