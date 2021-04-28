import React from "react";
import './Products.css'

const Product = () => {

    const products = [
        {id: 1, name: 'Aquafina (12-Liter Bottle)', price: 160},
        {id: 2, name: 'Aquafina (19-Liter Bottle)', price: 200},
        {id: 3, name: 'Aquafina (500-mL Bottle - Pack of 12)', price: 180},
        {id: 4, name: 'Aquafina (1.5-Liter Bottle - Pack of 6)', price: 180},
        {id: 5, name: 'Aquafina (6-Liter Bottle)', price: 80},
    ]

    const productList = products.map((product) =>
        <div className={'pt-item'}>
            <div className={'item-cell p-sr'}>{product.id}</div>
            <div className={'item-cell p-name'}>{product.name}</div>
            <div className={'item-cell p-price'}>{product.price}</div>
        </div>
    )

    return (
        <>
            <section className={'product-hero-container'}>
                <span>Products</span>
            </section>

            <section className={'product-content-container'}>
                <h1 className={'product-title'}>Available Products</h1>
                <div className={'pt-header'}>
                    <div className={'pt-cell p-sr'}>ID</div>
                    <div className={'pt-cell p-name'}>Product Name</div>
                    <div className={'pt-cell p-price'}>Price</div>
                </div>
                { productList }
            </section>
        </>
    )
}

export default Product;
