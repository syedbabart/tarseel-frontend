import React from "react";
import MainSection from "../MainSection";
import styles from './Home.module.css'
import Snackbar from "../Snackbar";

const Home = () => {
    return (
        <>
            <MainSection />

            <section className={styles.processContainer}>
                <div className={styles.step}>

                </div>
            </section>
            <Snackbar message={'Snackbar'}/>
        </>
    )
}
export default Home;
