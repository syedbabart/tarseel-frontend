import React, {useEffect, useState} from "react";
import './Cart.css'
import axios from "axios";
import {rootUrl} from "../../App";
import spinnerBlue from "../../assets/spinnerBlue.svg";
import PlaceOrder from "../PlaceOrder";
import Snackbar from "../Snackbar";
import auth from "../../auth/auth";
import {useHistory} from "react-router-dom";

const Cart = () => {
    const [openPlaceOrder, setOpenPlaceOrder] = useState(false)
    const [productList, setProductList] = useState([])
    const [loadingCart, setLoadingCart] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    let products = []
    const [orders] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line
    }, [])

    const fetchProducts = () => {
        setLoadingCart(true)
        axios.get(rootUrl + 'product/all').then(
            response => {
                // eslint-disable-next-line
                products = (response.data.products)
                generateProductList(response.data.products)
            },
            error => {
                console.log(error)
            }
        )
    }

    const generateProductList = (products) => {
        const pList = products
            .filter(product => (!!localStorage.getItem(product._id)))
            // eslint-disable-next-line
            .map(product => {
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

                                <div className={'cart-buttons-container'}>
                                    {isAddedToBuyingList(product._id) ?
                                        (<div className={'select-button deselect-button'}
                                              onClick={() => onDeselectOrder(product._id)}>
                                            <i className="fas fa-times"/>
                                        </div>) :
                                        (<div className={'select-button'}
                                              onClick={() => onSelectOrder(product._id, product.price)}>
                                            <i className="fas fa-check"/>
                                        </div>)
                                    }

                                    <div className={'delete-item'} onClick={() => deleteItem(product._id)}>
                                        <i className="fas fa-trash-alt"/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            )
        setProductList(pList)
        setLoadingCart(false)
    }

    const deleteItem = (id) => {
        localStorage.removeItem(id)
        generateProductList(products)
    }

    const isAddedToBuyingList = (productId) => {
        for (let i = 0; i < orders.length; i++) {
            if (orders[i]._id === productId) {
                return true
            }
        }
        return false
    }

    const onSelectOrder = (productId, productPrice) => {
        if (!isAddedToBuyingList(productId)) {
            const currentOrder = {
                _id: productId,
                quantity: localStorage.getItem(productId),
                productTotal: JSON.parse(localStorage.getItem(productId)) * productPrice
            }
            orders.push(currentOrder)
            generateProductList(products)
        }
    }

    const onDeselectOrder = (productId) => {
        if (isAddedToBuyingList(productId)) {
            const removeIndex = orders.map(product => {
                return product._id
            }).indexOf(productId)
            orders.splice(removeIndex, 1)
            generateProductList(products)
        }
    }

    const onOrderOpen = () => {
        if (auth.isLoggedIn()) {
            if (orders.length > 0) {
                setOpenPlaceOrder(true)
            } else {
                onOpenSnackbar('Select at least one product to proceed!')
            }
        } else {
            history.push('/login')
        }
    }

    const onOrderClose = () => {
        setOpenPlaceOrder(false)
    }

    const onOpenSnackbar = (message) => {
        setOpenSnackbar(true)
        setSnackbarMessage(message)
        setTimeout(
            () => setOpenSnackbar(false),
            3000
        )
    }


    return (
        <section className={'cart-section-container'}>
            <h1 className={'product-title'}>Cart</h1>

            {loadingCart && <img src={spinnerBlue} alt={'Loading'}/>}

            {!loadingCart && productList}

            {productList.length === 0 && !loadingCart && <div className={'cart-item empty-cart'}>
                Cart is empty
            </div>}

            <div className={'add-product-button'} onClick={onOrderOpen}>
                <span className={'add-button-text'}>Checkout </span>
            </div>

            {openPlaceOrder &&
            <PlaceOrder open={openPlaceOrder} onClose={onOrderClose} selectedOrders={orders} reload={fetchProducts}
                        openSnackbar={onOpenSnackbar}/>}

            {openSnackbar && <Snackbar message={snackbarMessage}/>}

        </section>
    )
}
export default Cart
