import React, { useEffect, useState} from "react";
import './Products.css'
import Popup from "../Popup";
import axios from "axios";
import {rootUrl} from "../../App";
import AddProduct from "../AddProduct";
import spinnerBlue from '../../assets/spinnerBlue.svg'
import auth from "../../auth/auth";

const Product = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [productList, setProductList] = useState([])
    const [modalType, setModalType] = useState('add')
    const [open, setOpen] = useState(false);
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({
        _id: '',
        name: '',
        amount: '',
        price: ''
    })

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line
    }, [])

    const fetchProducts = () => {
        setIsLoading(true)
        axios.get(rootUrl + 'product/all').then(
            response => {
                generateProductList(response.data.products)
            },
            error => console.log(error)
        )
    }


    const onOpenModal = (id, name, amount, price, modalType) => {
        if (localStorage.getItem('userType') === 'admin') {
            onOpenAddProductModal(id, name, amount, price, modalType)
        } else {
            onOpenProductModal(id, name, amount, price)
        }
    }

    const onOpenAddProductModal = (id, name, amount, price, modalType) => {
        setModalType(modalType)
        setCurrentProduct({
            ...currentProduct,
            _id: id,
            name: name,
            amount: amount,
            price: price
        })
        setOpenAddProduct(true)
    }

    const onOpenProductModal = (id, name, amount, price) => {
        if (auth.getUserType() !== 'employee' && auth.getUserType() !== 'admin') {
            setCurrentProduct({
                ...currentProduct,
                _id: id,
                name: name,
                amount: amount,
                price: price
            })
            setOpen(true)
        }
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    const onCloseAddProduct = () => {
        setOpenAddProduct(false)
    }

    const generateProductList = (products) => {
        const pList = products.map((product, index) =>
            <div className={'pt-item'} key={product._id}
                 onClick={() => onOpenModal(product._id, product.name, product.amount, product.price, 'edit')}>
                <div className={'item-cell p-sr'}>{index + 1}</div>
                <div className={'item-cell p-name'}>{product.name} <br className={'lineBr'}/> <span>({product.amount})</span></div>
                <div className={'item-cell p-price'}>{product.price}</div>
            </div>
        )
        setProductList(pList)
        setIsLoading(false)
    }

    return (
        <>
            <section className={'product-hero-container'}>
                <span>Products</span>
            </section>

            {isLoading && <section className={'product-content-container'}>
                <h1 className={'product-title'}>Available Products</h1>
                <img alt={'loading'} src={spinnerBlue}/>
            </section>}

            {!isLoading && <section className={'product-content-container'}>
                <h1 className={'product-title'}>Available Products</h1>
                <div className={'pt-header'}>
                    <div className={'pt-cell p-sr'}>SR.</div>
                    <div className={'pt-cell p-name'}>NAME</div>
                    <div className={'pt-cell p-price'}>PRICE</div>
                </div>
                {productList}
            </section>}

            {localStorage.getItem('userType') === 'admin' &&
            <div className={'add-product-button'} onClick={() => onOpenAddProductModal('', '', '', '', 'add')}><span
                className={'add-button-text'}>Add product </span>
                <i className="fas fa-plus"/></div>}

            {open && <Popup open={open} onClose={onCloseModal} currentProduct={currentProduct}/>}
            {openAddProduct && <AddProduct open={openAddProduct} onClose={onCloseAddProduct} fetchProducts={fetchProducts} modalType={modalType}
                         currentProduct={currentProduct}/>}
        </>
    )
}
export default Product;
