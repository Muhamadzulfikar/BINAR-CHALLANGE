const Faq = () => {
    return (
        <section className="faq-container row w-100">
            <section className="col-md-5 col-12">
                <h1 className="faq-heading fw-bold">Frequently Asked Question</h1>
                <p className="faq-sub-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </section>
            <section className="col-md-6 col-12">
                <section className="accordion" id="accordionExample">
                    <section className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Apa saja syarat yang dibutuhkan?
                            </button>
                        </h2>
                        <section id="collapseOne" className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample">
                            <section className="accordion-body">
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </section>
                        </section>
                    </section>
                    <section className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Berapa hari minimal sewa mobil lepas kunci?
                            </button>
                        </h2>
                        <section id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <section className="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                the collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </section>
                        </section>
                    </section>
                    <section className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Berapa hari sebelumnya sabaiknya booking sewa mobil?
                            </button>
                        </h2>
                        <section id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <section className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </section>
                        </section>
                    </section>
                    <section className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                Apakah Ada biaya antar-jemput?
                            </button>
                        </h2>
                        <section id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <section className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </section>
                        </section>
                    </section>
                    <section className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                                Bagaimana jika terjadi kecelakaan
                            </button>
                        </h2>
                        <section id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <section className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classNamees that we use to style each element. These
                                classNamees control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Faq