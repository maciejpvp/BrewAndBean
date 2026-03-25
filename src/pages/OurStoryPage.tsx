import styles from './OurStoryPage.module.css';

export const OurStoryPage = () => {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <section className={`${styles.heroSection} ${styles.editorialGrid}`}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroLabel}>Est. 2014</span>
                        <h1 className={styles.heroTitle}>
                            Elevating the coffee ritual through <i>intentional</i> craft.
                        </h1>
                        <p className={styles.heroText}>
                            Brew&amp;Bean began with a single question: How do we honor the hands that harvest the cherry? Today, we are a collective of roasters, tasters, and storytellers dedicated to the alchemy of the bean.
                        </p>
                    </div>
                    <div className={styles.heroImageContainer}>
                        <div className={styles.heroImageWrapper}>
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtqfkOimGIfcLSl5sH-3Wq-vohDAlorAPxh7B-eB7fm4lSWHDrLgZo5zivVu3gREITpB-QUpzoOliVDj1iWVWGkspPbfc8jQvfPkXEPXOC7hP68M92lpKPg9GQxTyPu5u8mof88pPHHKzhQTWS4RuYTX1HMFm4mvTq4NBn2SOe4kvtMy6-rqETX7PLpEhREsPcISF8WlRcoIOsr2PMN7ktHEc5jgEBive7GH0NwmMlHx7mVLh-AR_ql3sMlGbsifqzewUvWN4WfdA" 
                                alt="Artisanal coffee being poured" 
                                className={styles.heroImage} 
                            />
                        </div>
                    </div>
                </section>

                {/* Sourcing Philosophy */}
                <section className={styles.sourcingSection}>
                    <div className={styles.sourcingContainer}>
                        <div className={styles.sourcingHeader}>
                            <h2 className={styles.sourcingTitle}>Our Ethical Blueprint</h2>
                            <p className={styles.sourcingHeaderLabel}>Traceability &amp; Trust</p>
                        </div>
                        <div className={styles.sourcingGrid}>
                            <div className={styles.sourcingItem}>
                                <div className={styles.sourcingDivider}></div>
                                <span className={styles.sourcingNumber}>01</span>
                                <h3 className={styles.sourcingItemTitle}>Direct Trade Origins</h3>
                                <p className={styles.sourcingItemText}>We bypass traditional auctions to work directly with estates in Ethiopia, Colombia, and Sumatra, ensuring 40% higher wages for farmers.</p>
                            </div>
                            <div className={styles.sourcingItem}>
                                <div className={styles.sourcingDivider}></div>
                                <span className={styles.sourcingNumber}>02</span>
                                <h3 className={styles.sourcingItemTitle}>Seasonal Curations</h3>
                                <p className={styles.sourcingItemText}>Coffee is an agricultural product. We only roast what is in season, capturing the peak vibrance of each region's harvest.</p>
                            </div>
                            <div className={styles.sourcingItem}>
                                <div className={styles.sourcingDivider}></div>
                                <span className={styles.sourcingNumber}>03</span>
                                <h3 className={styles.sourcingItemTitle}>Micro-Batch Precision</h3>
                                <p className={styles.sourcingItemText}>Roasting in 5kg batches allows our head roaster to monitor every thermal curve, bringing out the hidden sugars in every bean.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Roasting Process */}
                <section className={`${styles.alchemySection} ${styles.editorialGrid}`}>
                    <div className={styles.alchemyImageContainer}>
                        <div className={styles.alchemyImageWrapper}>
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqlDaGuPFm0Lic7DE5tBOa8ADGBBgEnWpY2w1dB_jIP_T2fyNfUFIKwZCbus3Hac-w5lJwhkWJXLjsdiiL2ULuU95WvXNxP6YxfzaUx88JJWklS2LHvmgATQKOexF707XE4MWgd-tj7QuOihcYQg_ZptHEAJH0_uvQANaAKt2YBv-KduN5qZKkvVltFAHzHOUOyB0S2W4lvlcLX2_Rof-vfLsm2LgCOk3_FQ7IzuXtBCgkqk9YVq-DpZKBzzTyMo-sSV7W6ydEn8A" 
                                alt="Coffee roasting machine" 
                                className={styles.alchemyImage} 
                            />
                        </div>
                        <div className={styles.roastOverlay}>
                            <h4 className={styles.roastOverlayTitle}>Roast Profile: Signature Gold</h4>
                            <div className={styles.roastBarBg}>
                                <div className={styles.roastBarFill}></div>
                            </div>
                            <div className={styles.roastLabels}>
                                <span>Light</span>
                                <span>Medium-Dark</span>
                            </div>
                            <p className={styles.roastDesc}>Developed specifically for clarity and a balanced honeyed finish.</p>
                        </div>
                    </div>
                    
                    <div className={styles.alchemyContent}>
                        <h2 className={styles.alchemyTitle}>The Alchemy of the Flame</h2>
                        <p className={styles.alchemyText}>
                            Our roasting philosophy is one of restraint. We seek to highlight the varietal's terroir—the volcanic soil of Antigua or the high-altitude mists of Sidama—rather than the taste of the roast itself.
                        </p>
                        <div className={styles.alchemyFeatures}>
                            <div className={styles.featureItem}>
                                <span className={`material-symbols-outlined ${styles.featureIcon}`}>thermostat</span>
                                <p className={styles.featureText}>Precision Thermal Profiling</p>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={`material-symbols-outlined ${styles.featureIcon}`}>waves</span>
                                <p className={styles.featureText}>Air-Flow Controlled Development</p>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={`material-symbols-outlined ${styles.featureIcon}`}>timer</span>
                                <p className={styles.featureText}>48-Hour Degassing Protocol</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Signature CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaContainer}>
                        <h2 className={styles.ctaTitle}>Experience the Craft</h2>
                        <p className={styles.ctaText}>From our roastery to your kitchen. Explore this month's featured single origins.</p>
                        <button className={styles.ctaButton}>
                            Explore the Collection
                        </button>
                    </div>
                </section>
            </main>

        </div>
    );
};

export default OurStoryPage;