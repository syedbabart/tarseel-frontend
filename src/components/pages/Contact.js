import React from "react";
import styles from './Contact.module.css'

const Contact = () => {
    return (
        <section className={styles.contactContainer}>
            <h2 className={styles.contactPageTitle}>Contact us</h2>

            <section className={styles.profileData}>
                <div className={styles.row}>
                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="fas fa-map-marker-alt"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Office</div>
                            <div>Islamabad, Pakistan</div>
                        </div>
                    </div>

                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="far fa-envelope"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Email</div>
                            <div>tarseel@mail.com</div>
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className={`fas fa-phone`}/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Phone Number</div>
                            <div>+923456789010</div>
                        </div>
                    </div>

                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="fas fa-history"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Office Timings</div>
                            <div>Mon-Fri (9 am - 5 pm) </div>
                        </div>
                    </div>
                </div>

            </section>

        </section>
    )
}
export  default Contact
