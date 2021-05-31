import React, {useEffect, useState} from "react";
import styles from './AllOrders.module.css'
import {rootUrl} from "../../App";
import axios from "axios";
import auth from "../../auth/auth";

const AllOrders = () => {

    const [allOrders, setAllOrders] = useState([])
    const [allOrdersList, setAllOrdersList] = useState()
    const [allAreas, setAllAreas] = useState([])
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line
    }, [])


    const fetchProducts = () => {
        const productsUrl = `${rootUrl}product/all`
        axios.get(productsUrl).then(
            products => {
                setAllProducts(products.data.products)
                fetchAreas(products.data.products)
            },
            error => {
                console.log(error)
            }
        )
    }

    const fetchAreas = (products) => {
        const areasUrl = `${rootUrl}area/all`
        axios.get(areasUrl).then(
            areas => {
                setAllAreas(areas.data.areas)
                fetchAllOrders(products, areas.data.areas)
            },
            error => {
                console.log(error)
            }
        )
    }

    const fetchAllOrders = (products, areas) => {
        const url = `${rootUrl}order/all`
        axios.get(url, auth.getHeader()).then(
            orders => {
                setAllOrders(orders.data.orders)
                generateOrdersList(orders.data.orders, products, areas)
            },
            error => {
                console.log(error)
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
        orderProducts.map(product => {
            sum += (JSON.parse(getProduct(products, product.productId).price) * JSON.parse(product.quantity))
        })
        return sum

    }

    const generateProductsList = (orderProducts, products) => {
        const productList = orderProducts.map(product =>
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
        return productList
    }

    const generateOrdersList = (orders, products, areas) => {
        const oList = orders.map((order) => {
                return (
                    <div className={styles.item} key={order._id}>
                        <div className={styles.itemHeader}>
                            <span className={styles.completeButton}>Mark as completed</span>
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
    }

    return (
        <section className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>All Orders</h2>

            {/*<div className={styles.item}>*/}
            {/*    <div className={styles.itemHeader}>*/}
            {/*        <span className={styles.completeButton}>Mark as completed</span>*/}
            {/*    </div>*/}
            {/*    <div className={styles.itemWrap}>*/}
            {/*        <div className={styles.products}>*/}
            {/*            <span className={styles.label}>Products</span>*/}
            {/*            <div className={styles.productItem}>*/}
            {/*                <h4>Product Title</h4>*/}
            {/*                <span>1 liter</span>*/}
            {/*                <div className={styles.productDetails}>*/}
            {/*                    <div className={styles.productPrice}>Rs. 1000</div>*/}
            {/*                    <div className={styles.productQuantity}><span>Quantity:</span> 5</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className={styles.productItem}>*/}
            {/*                <h4>Product Title</h4>*/}
            {/*                <span>1 liter</span>*/}
            {/*                <div className={styles.productDetails}>*/}
            {/*                    <div className={styles.productPrice}>Rs. 1000</div>*/}
            {/*                    <div className={styles.productQuantity}><span>Quantity:</span> 5</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={styles.details}>*/}
            {/*            <div className={styles.area}>*/}
            {/*                <span className={styles.label}>Area</span>*/}
            {/*                <div>Jinnah Garden, Islamabad</div>*/}
            {/*            </div>*/}
            {/*            <div className={styles.address}>*/}
            {/*                <span className={styles.label}>Address</span>*/}
            {/*                <div>9 Jinnah Ave, F 6/1 Blue Area, Islamabad, Islamabad Capital Territory, Pakistan</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {allOrdersList}

        </section>
    )
}
export default AllOrders
