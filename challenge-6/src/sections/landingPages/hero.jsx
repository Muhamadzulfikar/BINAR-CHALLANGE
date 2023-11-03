import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className="hero-container row">
        <section className="hero-container-left-side col-sm-12 col-md-6 align-self-center">
            <h1 className="hero-section-header fw-bold">Sewa & Rental Mobil Terbaik di kawasan Batam</h1>
            <p className="hero-section-sub-header">Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
                terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
            <Link to='search-car' className='hero-button btn text-white'>Mulai Sewa Mobil</Link>
        </section>
        <section className="col-md-6">
            <img className="car-image" src="Asset/Image/img_car.png" alt="" />
        </section>
    </section>
    )
}

export default Hero