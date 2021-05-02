import React, {useEffect, useState} from "react";
import './Orders.css'

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const Orders = () => {

    const forceUpdate = useForceUpdate();

    const products = [
        {id: 1, name: 'Aquafina (12-Liter Bottle)', price: 160},
        {id: 2, name: 'Aquafina (19-Liter Bottle)', price: 200},
        {id: 3, name: 'Aquafina (500-mL Bottle - Pack of 12)', price: 180},
        {id: 4, name: 'Aquafina (1.5-Liter Bottle - Pack of 6)', price: 180},
        {id: 5, name: 'Aquafina (6-Liter Bottle)', price: 80},
    ]

    const productList = products.map((product) => {
            if (localStorage.getItem(product.name)) {
                return (
                    <div className={'cart-item'} key={product.name}>
                        <div className={'item-info'}>
                            <div>{product.name}</div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                            </p>
                            <span>Rs. {product.price}</span>
                        </div>
                        <div className={'item-quantity'}>
                            <div>Quantity</div>
                            <p>{localStorage.getItem(product.name)}</p>
                        </div>
                        <div className={'total'}>
                            <div>Total</div>
                            <p>Rs. {product.price * (JSON.parse(localStorage.getItem(product.name)))}</p>
                        </div>
                        <div className={'delete-item'} onClick={() => deleteItem(product.name)}><i
                            className="fas fa-trash-alt"/></div>
                        <div className={'confirm-order'}>Confirm Order</div>
                    </div>
                )
            }
        }
    )




    const deleteItem = (name) => {
        localStorage.removeItem(name)
        // getCartProducts()
        forceUpdate()
    }

    return (
        <section className={'cart-section-container'}>
            <h1 className={'product-title'}>Shopping Cart</h1>

            {productList}

        </section>
    )
}
export default Orders
