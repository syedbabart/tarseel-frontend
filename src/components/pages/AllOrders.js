import React, {useEffect, useState} from "react";
import styles from './AllOrders.module.css'
import {rootUrl} from "../../App";
import axios from "axios";
import auth from "../../auth/auth";
import spinnerBlue from '../../assets/spinnerBlue.svg'
import {areasList, productsList} from "../../auth/data";

const AllOrders = () => {
    const [deliveredOrders, setDeliveredOrders] = useState([])
    const [unDeliveredOrders, setUndeliveredOrders] = useState([])
    const [showDeliveredOrder, setShowDeliveredOrders] = useState(false)
    let [allAreas] = useState([])
    let [allProducts] = useState([])
    const [fetchingOrders, setFetchingOrders] = useState(false)

    useEffect(() => {
        if (productsList !== undefined && areasList !== undefined) {
            // eslint-disable-next-line
            allProducts = productsList
            // eslint-disable-next-line
            allAreas = areasList
            fetchAllOrders(productsList, areasList)
        } else if (productsList === undefined) {
            fetchProducts()
        } else if (areasList === undefined) {
            // eslint-disable-next-line
            allProducts = productsList
            fetchAreas(productsList)
        }
        return () => {
            setFetchingOrders(false)
        }
        // eslint-disable-next-line
    }, [])


    const fetchProducts = () => {
        setFetchingOrders(true)
        const productsUrl = `${rootUrl}product/all`
        axios.get(productsUrl).then(
            products => {
                allProducts = products.data.products
                if (areasList === undefined) {
                    fetchAreas(products.data.products)
                } else {
                    fetchAllOrders(products.data.products, areasList)
                }
            },
            error => {
                console.log(error)
                setFetchingOrders(false)
            }
        )
    }

    const fetchAreas = (products) => {
        setFetchingOrders(true)
        const areasUrl = `${rootUrl}area/all`
        axios.get(areasUrl).then(
            areas => {
                allAreas = areas.data.areas
                fetchAllOrders(products, areas.data.areas)
            },
            error => {
                console.log(error)
                setFetchingOrders(false)
            }
        )
    }

    const fetchAllOrders = (products, areas) => {
        setFetchingOrders(true)
        const url = `${rootUrl}order/all`
        axios.get(url, auth.getHeader()).then(
            orders => {
                generateOrdersList(orders.data.orders, products, areas)
            },
            error => {
                console.log(error)
                setFetchingOrders(false)
            }
        )
    }

    const getArea = (areas, areaId) => {
        for (let i = 0; i < areas.length; i++) {
            if (areas[i]._id === areaId) {
                return areas[i]
            }
        }
    }

    const getProduct = (products, productId) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === productId) {
                return products[i]
            }
        }
    }

    const getGrandTotal = (orderProducts, products) => {
        let sum = 0;
        // eslint-disable-next-line
        orderProducts.map(product => {
            sum += (JSON.parse(getProduct(products, product.productId).price) * JSON.parse(product.quantity))
        })
        return sum
    }

    const generateProductsList = (orderProducts, products) => {
        return orderProducts.map(product =>
            <div key={product.productId}>
                <div className={styles.productName}>
                    <span>{(getProduct(products, product.productId)).name}</span>
                    <span className={styles.productAmount}>({(getProduct(products, product.productId)).amount})</span>
                </div>
                <div className={styles.productDetails}>
                    <div className={styles.productPrice}>Rs. {(getProduct(products, product.productId)).price}</div>
                    <div className={styles.productQuantity}><span>Quantity:</span> {product.quantity}</div>
                </div>
                <hr/>
            </div>
        )
    }

    const generateOrdersList = (orders, products, areas) => {
        setFetchingOrders(true)
        const deliveredOrdersList = orders.filter(order => (order.isDelivered))
            .map((order) => {
                    return (
                        <div className={styles.item} key={order._id}>
                            <div className={styles.itemWrap}>
                                <div className={styles.products}>
                                    <span className={styles.label}>Products</span> ({order.products.length})
                                    {generateProductsList(order.products, products)}
                                    <div
                                        className={styles.grandTotal}>Total: {getGrandTotal(order.products, products)}</div>
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.area}>
                                        <span className={styles.label}>Area</span>
                                        <div>{getArea(areas, order.deliveryArea) && (getArea(areas, order.deliveryArea).name)}</div>
                                    </div>
                                    <div className={styles.address}>
                                        <span className={styles.label}>Address</span>
                                        <div>{order.deliveryAddress}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        const unDeliveredOrdersList = orders.filter(order => (!order.isDelivered))
            .map((order) => {
                    return (
                        <div className={styles.item} key={order._id}>
                            {auth.getUserType() === 'employee' && <div className={styles.itemHeader}>
                                <span className={styles.completeButton} onClick={() => onDeliverOrder(order._id)}>Mark as delivered</span>
                            </div>}
                            <div className={styles.itemWrap}>
                                <div className={styles.products}>
                                    <span className={styles.label}>Products</span> ({order.products.length})
                                    {generateProductsList(order.products, products)}
                                    <div
                                        className={styles.grandTotal}>Total: {getGrandTotal(order.products, products)}</div>
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.area}>
                                        <span className={styles.label}>Area</span>
                                        <div>{getArea(areas, order.deliveryArea) && (getArea(areas, order.deliveryArea).name)}</div>
                                    </div>
                                    <div className={styles.address}>
                                        <span className={styles.label}>Address</span>
                                        <div>{order.deliveryAddress}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        setDeliveredOrders(deliveredOrdersList)
        setUndeliveredOrders(unDeliveredOrdersList)
        setFetchingOrders(false)
    }

    const onDeliverOrder = (orderId) => {
        const url = `${rootUrl}order/${orderId}`
        const order = {
            isDelivered: true
        }
        axios.patch(url, order, auth.getHeader()).then(
            response => {
                fetchAllOrders(allProducts, allAreas)
            },
            error => {
                console.log(error)
            }
        )
    }

    return (
        <section className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Orders</h2>
            {!fetchingOrders && <div className={`${styles.userTabs}`}>
                <div className={`${styles.firstTab} ${!showDeliveredOrder && styles.activeTab}`}
                     onClick={() => setShowDeliveredOrders(false)}>Undelivered
                </div>
                <div className={`${styles.secondTab} ${showDeliveredOrder && styles.activeTab}`}
                     onClick={() => setShowDeliveredOrders(true)}>Delivered
                </div>
            </div>}

            {fetchingOrders ?
                <img alt={'loading'} src={spinnerBlue}/> :
                (
                    showDeliveredOrder ? (
                        deliveredOrders.length > 0 ? deliveredOrders :
                            <div className={`${styles.item} empty-cart`}>No delivered orders</div>
                    ) : (
                        unDeliveredOrders.length > 0 ? unDeliveredOrders :
                            <div className={`${styles.item} empty-cart`}>No undelivered orders</div>
                    )
                )
            }

        </section>
    )
}
export default AllOrders
