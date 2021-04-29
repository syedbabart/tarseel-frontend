import React, {useEffect, useState} from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import './Popup.css'

const Card = (props) => {
    const [open, setOpen] = useState(false);
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [currentProduct, setCurrentProduct] = useState({
        id: '',
        name: '',
        price: ''
    })

    const onCloseModal = () => {
        props.onClose();
        setOpen(false)
    };

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    useEffect(() => {
        setCurrentProduct(props.currentProduct)
    }, [props.currentProduct])

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <h2>{currentProduct.name}</h2>
                <p className={'modal-price'}>Rs. { currentProduct.price}</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                </p>

                <div className={'product-quantity-container'}>
                    Quantity:
                    <button className={'quantity-button'} onClick={() => setCurrentQuantity(currentQuantity-1)}>-</button>
                    <input className={'quantity-input'} type={'number'} value={currentQuantity} onChange={e => setCurrentQuantity(e.target.value)}/>
                    <button className={'quantity-button'} onClick={() => setCurrentQuantity(currentQuantity+1)}>+</button>
                </div>

                <div className={'modal-footer'}>
                    <button className={'modal-button'} onClick={onCloseModal}>Cancel</button>
                    <button className={'modal-button'}>Add to Cart <i className="fas fa-cart-plus"/></button>
                </div>
            </Modal>
        </div>
    );
};
export default Card
