import '../assets/Css/style.css'
import Navbar from '../components/landingPages/navbar'
import Banner from '../sections/landingPages/banner'
import Faq from '../sections/landingPages/faq'
import Footer from '../sections/landingPages/footer'
import Hero from '../sections/landingPages/hero'
import Service from '../sections/landingPages/service'
import Testimonial from '../sections/landingPages/testimonial'
import WhyUs from '../sections/landingPages/whyUs'

const Home = () => {
    return (
        <section>
            <Navbar />
            <Hero />
            <Service />
            <WhyUs />
            <Testimonial />
            <Banner />
            <Faq />
           <Footer />
        </section>
    )
}

export default Home