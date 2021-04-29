import React, {useEffect, useState} from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import './Popup.css'

const Card = (props) => {
    const [open, setOpen] = useState(false);
    const [productDescription, setProductDescription] = useState('')
    //
    // const onOpenModal = (description) => {
    //     setProductDescription(description)
    //     setOpen(true)
    // };
    const onCloseModal = () => {
        props.onClose();
        setOpen(false)
    };

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    useEffect(() => {
        setProductDescription(props.productDescription)
    })

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <h2>{productDescription}</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                </p>
            </Modal>
        </div>
    );
};
export default Card
