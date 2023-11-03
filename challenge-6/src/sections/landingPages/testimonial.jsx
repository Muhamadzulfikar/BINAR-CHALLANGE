const Testimonial = () => {
    return (
        <section className="testimonial-container mx-md-auto">
        <h1 className="testimonial-heading fw-bold text-center">Testimonial</h1>
        <p className="testimonial-sub-heading text-center">Berbagai review positif dari para pelanggan kami</p>
        <section id="carouselExample" className="carousel slide testimonial-carousel rounded">
            <section className="carousel-inner">
                <section className="carousel-item active d-flex flex-colum flex-md-row justify-content-center">
                    <section className="testimonial-carousel-image"
                        style={{backgroundImage: "url('Asset/Image/img_photo.png')"}}>
                    </section>
                    <section className="testimonial-carousel-content">
                        <img src="Asset/Image/Rate.png" alt="" />
                        <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor
                            sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod</p>
                        <p>John Dee 32, Bromo</p>
                    </section>
                </section>
                <section className="carousel-item d-flex flex-colum flex-md-row justify-content-center">
                    <section className="testimonial-carousel-image"
                         style={{backgroundImage: "url('Asset/Image/img_photo.png')"}}>
                    </section>
                    <section className="testimonial-carousel-content">
                        <img src="Asset/Image/Rate.png" alt="" />
                        <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor
                            sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod</p>
                        <p>John Dee 32, Bromo</p>
                    </section>
                </section>
                <section className="carousel-item d-flex flex-colum flex-md-row justify-content-center">
                    <section className="testimonial-carousel-image"
                        style={{backgroundImage: "url('Asset/Image/img_photo.png')"}}>
                    </section>
                    <section className="testimonial-carousel-content">
                        <img src="Asset/Image/Rate.png" alt="" />
                        <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor
                            sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod</p>
                        <p>John Dee 32, Bromo</p>
                    </section>
                </section>
            </section>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"><img src="Asset/Image/Left%20button.png"
                    alt="" /></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"><img src="Asset/Image/Right%20button.png"
                    alt="" /></span>
                <span className="visually-hidden">Next</span>
            </button>
        </section>
    </section>
    )
}

export default Testimonial