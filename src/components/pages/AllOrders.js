import React, {useEffect, useState} from "react";
import styles from './AllOrders.module.css'
import {rootUrl} from "../../App";
import axios from "axios";
import auth from "../../auth/auth";
import spinnerBlue from '../../assets/spinnerBlue.svg'

const AllOrders = () => {
    const [allOrdersList, setAllOrdersList] = useState()
    let [allAreas] = useState([])
    let [allProducts] = useState([])
    const [fetchingOrders, setFetchingOrders] = useState(false)

    useEffect(() => {
        fetchProducts()
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
                fetchAreas(products.data.products)
            },
            error => {
                console.log(error)
                setFetchingOrders(false)
            }
        )
    }

    const fetchAreas = (products) => {
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
        const oList = orders.map((order) => {
                return (
                    <div className={styles.item} key={order._id}>
                        <div className={styles.itemHeader}>
                            <span className={styles.completeButton} onClick={() => onCompleteOrder(order._id)}>Mark as completed</span>
                        </div>
                        <div className={styles.itemWrap}>
                            <div className={styles.products}>
                                <span className={styles.label}>Products</span> ({order.products.length})
                                {generateProductsList(order.products, products)}
                                <div className={styles.grandTotal}>Total: {getGrandTotal(order.products, products)}</div>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.area}>
                                    <span className={styles.label}>Area</span>
                                    <div>{(getArea(areas, order.deliveryArea).name)}</div>
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
        setAllOrdersList(oList)
        setFetchingOrders(false)
    }

    const onCompleteOrder = (orderId) => {
        const url = `${rootUrl}order/${orderId}`
        axios.delete(url, auth.getHeader()).then(
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
            <h2 className={styles.pageTitle}>All Orders</h2>

            {fetchingOrders ?
                <img alt={'loading'} src={spinnerBlue}/> :
                allOrdersList
            }

        </section>
    )
}
export default AllOrders
