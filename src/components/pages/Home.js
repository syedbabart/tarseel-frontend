import React from "react";
import MainSection from "../MainSection";
import styles from './Home.module.css'
import placeOrder from '../../assets/placeOrder.png'
import orderApproval from '../../assets/OrderApprocal.png'
import deliver from '../../assets/Deliver.png'


const Home = () => {

    return (
        <>
            <MainSection />

            <section className={styles.processContainer}>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>1</div>
                    <div className={styles.stepIcon}>
                        <i className="fas fa-cart-arrow-down fa-5x"/>
                    </div>
                    <h3>Select Product</h3>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>2</div>
                    <div className={styles.stepIcon}>
                        <img src={placeOrder} alt={'place order'}/>
                    </div>
                    <h3>Place Order</h3>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>3</div>
                    <div className={styles.stepIcon}>
                        <img src={orderApproval} alt={'order approval'}/>
                    </div>
                    <h3>Order Approval</h3>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>4</div>
                    <div className={styles.stepIcon}>
                        <img src={deliver} alt={'deliver'}/>
                    </div>
                    <h3>Order Delivery</h3>
                </div>
            </section>
        </>
    )
}
export default Home;
