import { Link } from 'react-router-dom'

const Navbar = () => {
    const token = localStorage.getItem('bearerToken')
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-container">
            <div className="container-fluid navbar-padding">
                <a className="navbar-brand text-uppercase text-dark fw-bold" href="#">Binar Rental Car</a>
                <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-3 pe-3">
                            <a className="nav-link text-dark" aria-current="page" href="#">Our Service</a>
                        </li>
                        <li className="nav-item me-3 pe-3">
                            <a className="nav-link text-dark" aria-current="page" href="#">Why Us</a>
                        </li>
                        <li className="nav-item me-3 pe-3">
                            <a className="nav-link text-dark" aria-current="page" href="#">Testimonial</a>
                        </li>
                        <li className="nav-item me-3 pe-3">
                            <a className="nav-link text-dark" aria-current="page" href="#">FAQ</a>
                        </li>
                        <li className="nav-item me-3 pe-3">
                            <Link to='/login' className='btn nav-register-button text-white'>{token ? 'Keluar' : 'Masuk'}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar