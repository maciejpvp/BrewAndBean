import styles from './BrewGuides.module.css';

export const BrewGuides = () => {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {/* Hero Section */}
                <header className={styles.hero}>
                    <div className={styles.heroContainer}>
                        <div className={styles.heroLeft}>
                            <h1 className={styles.heroTitle}>The Alchemist’s<br />Manual</h1>
                            <p className={styles.heroText}>
                                Brewing is not a chore; it is a transformative ritual. Here, we master the variables of time, heat, and pressure to reveal the hidden soul of the bean.
                            </p>
                        </div>
                        <div className={styles.heroRight}>
                            <span className={styles.heroLabel}>Current Selection</span>
                            <p className={styles.heroDate}>Ethiopian Yirgacheffe</p>
                        </div>
                    </div>
                </header>

                {/* Equipment Overview: Bento Grid Layout */}
                <section>
                    <h2 className={styles.sectionTitle}>Essential Instrumentation</h2>
                    <div className={styles.bentoGrid}>
                        <div className={styles.bentoItem1}>
                            <span className={`material-symbols-outlined ${styles.bentoIconPrimary}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>balance</span>
                            <div>
                                <h3 className={styles.bentoTitle}>Precision Scale</h3>
                                <p className={styles.bentoText}>Consistency is the foundation of alchemy. A 0.1g resolution ensures every extraction is repeatable and refined.</p>
                            </div>
                        </div>
                        <div className={styles.bentoItem2}>
                            <span className={`material-symbols-outlined ${styles.bentoIconPrimary}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>water_drop</span>
                            <div>
                                <h3 className={styles.bentoTitle}>Gooseneck</h3>
                                <p className={styles.bentoText}>The deliberate, circular pour requires a focused stream. Control the turbulence, control the taste.</p>
                            </div>
                        </div>
                        <div className={styles.bentoItem3}>
                            <span className={`material-symbols-outlined ${styles.bentoIconSecondary}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>precision_manufacturing</span>
                            <div>
                                <h3 className={styles.bentoTitleInverse}>Burr Grinder</h3>
                                <p className={styles.bentoTextInverse}>Uniformity over everything. Steel burrs preserve the volatile aromatics that blades destroy.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: The V60 Ritual */}
                <section className={styles.ritualSection}>
                    <div className={styles.ritualContainer}>
                        <div className={styles.ritualImageWrapper}>
                            <img 
                                alt="Coffee pour over" 
                                className={styles.ritualImage} 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ANTatzQgZO2sMx8dyBC6AwMGJhItlZ8S0qCREHIqvJs5sGZt1f-g16c24tIOZmfficvRjCBoXcQbuvZIDRkc9ugwsHJugpGUT-KncTYpxWOYrGoGkX4I53N9Zed84K2RvC8aZhqRpx13xy31a8umYS-FCd2hd3iFug32h5SSNMVq7ZPW7xLbDWyy6ZNtD_0trFdoh7lHGDig2ZwMekI-ty5aS16jwA6xTod1F9NXQ9juSgq4FDF4_i6J5TUf4dsjvUnH0J_QITU" 
                            />
                        </div>
                        <div className={styles.ritualContent}>
                            <span className={styles.heroLabel}>01 — The Clarity</span>
                            <h2 className={styles.ritualTitle}>The V60<br />Ritual</h2>
                            <p className={styles.ritualQuote}>
                                "The V60 is a delicate dance. It rewards patience and precision with a cup of unparalleled clarity and crystalline acidity."
                            </p>
                            <ul className={styles.ritualSteps}>
                                <li className={styles.ritualStep}>
                                    <span className={styles.stepNumber}>01</span>
                                    <div>
                                        <h4 className={styles.stepTitle}>The Bloom</h4>
                                        <p className={styles.stepText}>Pour 50g of water. Watch the gasses escape—the coffee is waking up.</p>
                                    </div>
                                </li>
                                <li className={styles.ritualStep}>
                                    <span className={styles.stepNumber}>02</span>
                                    <div>
                                        <h4 className={styles.stepTitle}>The Spiral</h4>
                                        <p className={styles.stepText}>Gentle concentric circles from the center out. Keep the water level constant.</p>
                                    </div>
                                </li>
                                <li className={styles.ritualStep}>
                                    <span className={styles.stepNumber}>03</span>
                                    <div>
                                        <h4 className={styles.stepTitle}>The Drawdown</h4>
                                        <p className={styles.stepText}>Wait for the flat bed of grounds. Total time: 3 minutes of focused presence.</p>
                                    </div>
                                </li>
                            </ul>
                            <button className={styles.readMoreBtn}>
                                Read the full manuscript
                                <span className={`material-symbols-outlined ${styles.arrowForward}`} style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section: The AeroPress Method */}
                <section className={styles.aeroSection}>
                    <div className={styles.aeroContainer}>
                        <div className={styles.aeroImageContainer}>
                            <div className={styles.aeroBgOffset}></div>
                            <img 
                                alt="Aeropress brewing" 
                                className={styles.aeroImage} 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj4b3CyFCVZem1UbmR2Oq0ki_rzf0XNdV_uwEZZ8tvXDWI369VgqacySaZNFtnHwNJjpjuYNTKp9K3G0ZxPshNExwzuybeM5kHmFWJOGBm1BmxWtUBom4qvYTHhXhwmw640B5bCFrMONcMe5Azp7yyIP72ck7QbnR6yEJ04ZjcLL-gNz6q0BOhVFxJLX6D4N-45RSefioQV2Naic6t5Y46Gh4T3Sp9Lvz8p7hoo9G2IWsdmKDILf2PooDnvT19HFdApxp4ve31fqY" 
                            />
                        </div>
                        <div className={styles.aeroContent}>
                            <span className={styles.heroLabel}>02 — The Intensity</span>
                            <h2 className={styles.ritualTitle}>The AeroPress<br />Method</h2>
                            <p className={styles.ritualQuote}>
                                "For the nomad and the pragmatist. A pressure-based immersion that yields a concentrated, syrupy body reminiscent of espresso."
                            </p>
                            <div className={styles.aeroGrid}>
                                <div>
                                    <span className={styles.aeroDivider}></span>
                                    <h4 className={styles.aeroParamTitle}>Technique</h4>
                                    <p className={styles.aeroParamText}>Inverted for maximum control over immersion time.</p>
                                </div>
                                <div>
                                    <span className={styles.aeroDivider}></span>
                                    <h4 className={styles.aeroParamTitle}>Grind</h4>
                                    <p className={styles.aeroParamText}>Medium-fine, like table salt, for a balanced extraction.</p>
                                </div>
                            </div>
                            <div className={styles.aeroTip}>
                                <p className={styles.aeroTipText}>
                                    Apply steady, even pressure. If the plunger offers too much resistance, coarsen your grind. If it falls through, grind finer. Listen for the hiss.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className={styles.cta}>
                    <h3 className={styles.ctaTitle}>Ready to begin your ritual?</h3>
                    <p className={styles.ctaSubtitle}>Source the same beans our alchemists use in our laboratory.</p>
                    <div className={styles.ctaButtons}>
                        <button className={styles.ctaBtnPrimary}>Shop the Collection</button>
                        <button className={styles.ctaBtnSecondary}>View All Guides</button>
                    </div>
                </section>
            </main>

        </div>
    );
};

export default BrewGuides;