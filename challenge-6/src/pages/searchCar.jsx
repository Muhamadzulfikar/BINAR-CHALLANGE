import Navbar from "../components/landingPages/navbar"
import Filter from "../sections/landingPages/filter"
import Hero from "../sections/landingPages/hero"
import axios from 'axios';
import { useEffect, useState } from "react";

const SearchCar = () => {
    const [cars, setCars] = useState();
    const [driver, setDriver] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [passenger, setPassenger] = useState();
    const [carFilters, setCarFilters] = useState();

    useEffect(() => {
        const getAllCars = async () => {
            try {
                const token = localStorage.getItem('bearerToken');
                !token && navigate('/login')

                const response = await axios.get('http://localhost:8000/cars', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCars(response.data.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        getAllCars()
    }, [])

    const filterCar = (e) => {
        e.preventDefault();
        const fullDateTime = `${date}T${time}:00.000Z`;
        const carsTime = cars[0].available_at
        console.log(carsTime)
        console.log(fullDateTime);
        const carFilter = cars.filter((car) => {
            return car.capacity >= passenger && car.available_at >= fullDateTime
        })
        setCarFilters(carFilter)
        console.log(carFilters)
    }

    return (
        <section>
            <Navbar />
            <Hero />
            <form onSubmit={filterCar} className="filter-container p-4 shadow-lg rounded position-absolute bg-white row">
                <div className="col-md-3 text-center ">
                    <p>Tipe Driver</p>
                    <select onChange={(e) => setDriver(e.target.value)} className="form-select" id="driver_type" name="driver_type">
                        <option value="dengan_sopir">Dengan Sopir</option>
                        <option value="tanpa_sopir">Tanpa Sopir</option>
                    </select>
                </div>
                <div className="col-md-3 text-center">
                    <p>Tanggal</p>
                    <input onChange={(e) => setDate(e.target.value)} className=" form-control" type="date" name="date" id="date" />
                </div>
                <div className="col-md-3 text-center ">
                    <p>Waktu Jemput / Ambil</p>
                    <select onChange={(e) => setTime(e.target.value)} className="form-select" id="time" name="time">
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="12:00">12:00</option>
                    </select>
                </div>
                <div className="col-md-3 text-center">
                    <p>Jumlah Penumpang (optional)</p>
                    <input onChange={(e) => setPassenger(e.target.value)} className="form-control" type="text" name="pessenger" id="pessenger" />
                    <div className="text-end mt-3">
                        <button id="search-car" className="btn btn-success">Cari Mobil</button>
                    </div>
                </div>
            </form>

            <section id="container-car" className="container mx-auto row list-car-container">
                {carFilters && carFilters.map((car) => {
                    return (
                        <div key={car.id} className="col-md-4">
                            <div className="card border-0">
                                <img src="" style={{ height: "13.875rem", objectFit: "cover" }} className="card-img-top"
                                    alt="..." />
                                <div className="card-body">
                                    <p className="card-text"></p>
                                    <h5 className="card-title">Rp / hari</h5>
                                    <p className="card-text description-car">

                                    </p>
                                    <p><i className="fa fa-users" aria-hidden="true"></i> Orang</p>
                                    <p><i className="fa fa-cog" aria-hidden="true"></i></p>
                                    <p><i className="fa fa-calendar-o" aria-hidden="true"></i> Tahun</p>
                                    <button className="btn btn-success w-100">Pilih Mobil</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </section>
    )
}

export default SearchCar