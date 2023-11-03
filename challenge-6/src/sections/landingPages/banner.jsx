import { Link } from 'react-router-dom'
const Banner = () => {
    return (
        <section className="banner-container mx-md-auto rounded text-white text-center">
            <h1 className="fw-bold banner-heading">Sewa Mobil di Batam Sekarang</h1>
            <p className="banner-sub-heading mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.</p>
            <Link to='search-car' className='btn rounded banner-button text-white'>Mulai Sewa Mobil</Link>
        </section>

    )
}

export default Banner