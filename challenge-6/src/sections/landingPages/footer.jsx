const Footer = () => {
    return (
        <footer className="footer-container row w-100">
        <section className="footer-address-container col-md-3">
            <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p>binarcarrental@gmail.com</p>
            <p>081-233-334-808</p>
        </section>

        <section className="footer-navigation-container col-md-3 ps-md-5">
            <p className="ms-md-2">Our services</p>
            <p className="ms-md-2">Why Us</p>
            <p className="ms-md-2">Testimonial</p>
            <p className="ms-md-2">FAQ</p>
        </section>

        <section className="footer-social-media-container col-md-3 ps-md-4">
            <p className="ms-md-2">Connect with us</p>
            <section className="footer-social-media-icon">
                <img src="Asset/Image/icon_facebook.png" alt="" />
                <img src="Asset/Image/icon_instagram.png" alt="" />
                <img src="Asset/Image/icon_twitter.png" alt="" />
                <img src="Asset/Image/icon_mail.png" alt="" />
                <img src="Asset/Image/icon_twitch.png" alt="" />
            </section>
        </section>

        <section className="footer-copyright-container col-md-3 ps-md-5">
            <p className="ms-md-2">Copyright Binar 2022</p>
            <div className="footer-copyright-rectangle ms-md-2 rounded"></div>
        </section>
    </footer>
    )
}

export default Footer