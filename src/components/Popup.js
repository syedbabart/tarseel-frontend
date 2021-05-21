import React, {useEffect, useState} from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import './Popup.css'
import {useHistory} from 'react-router-dom'

const Popup = (props) => {
    const [open, setOpen] = useState(false);
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [isProductAdded, setIsProductAdded] = useState(false)

    const history = useHistory()

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    useEffect(() => {
        console.log(props.currentProduct.name)
        let q = JSON.parse(localStorage.getItem(props.currentProduct.name))
        if (q) {
            setCurrentQuantity(q)
        } else {
            setCurrentQuantity(1)
        }
    }, [props.currentProduct])

    useEffect(() => {
        setIsProductAdded(false)
    }, [])

    const onCloseModal = () => {
        props.onClose();
        setOpen(false)
        setIsProductAdded(false)
    };

    const addToCart = () => {
        let quantity;
        if (currentQuantity)
            quantity = currentQuantity
        else
            quantity = 1

        localStorage.setItem(props.currentProduct.name, quantity)
        setIsProductAdded(true)
        console.log(localStorage.getItem((props.currentProduct.name)))
    }

    const navigateToCart = () => {
        history.push('/cart')
    }

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                {!isProductAdded && <section>
                    <h2>{props.currentProduct.name}</h2>
                    <p className={'modal-price'}>Rs. {props.currentProduct.price}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>

                    <div className={'product-quantity-container'}>
                        Quantity:
                        <button className={'quantity-button'}
                                onClick={() => setCurrentQuantity(currentQuantity - 1)}>-</button>
                        <input className={'quantity-input'} type={'number'} value={currentQuantity}
                               onChange={e => setCurrentQuantity(parseInt(e.target.value))}/>
                        <button className={'quantity-button'} onClick={() => setCurrentQuantity(currentQuantity + 1)}>+
                        </button>
                    </div>

                    <div className={'modal-footer'}>
                        <button className={'modal-button'} onClick={onCloseModal}>Cancel</button>
                        <button className={'modal-button'} onClick={addToCart}>Add to Cart <i
                            className="fas fa-cart-plus"/>
                        </button>
                    </div>
                </section>}

                {isProductAdded && <section className={'product-success-container'}>
                    <h1>Product successfully added to cart</h1>
                    <div className={'modal-footer'}>
                        <button className={'modal-button'} onClick={onCloseModal}>Cancel</button>
                        <button className={'modal-button'} onClick={navigateToCart}>Go to Cart <i
                            className="fas fa-shopping-cart"/></button>
                    </div>
                </section>}
            </Modal>
        </div>
    );
};
export default Popup
