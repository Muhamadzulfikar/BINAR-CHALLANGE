const Filter = () => {
    return (
        <section className="filter-container p-4 shadow-lg rounded position-absolute bg-white row">
        <div className="col-md-3 text-center ">
            <p>Tipe Driver</p>
            <select className="form-select" id="driver_type" name="driver_type">
                <option value="dengan_sopir">Dengan Sopir</option>
                <option value="tanpa_sopir">Tanpa Sopir</option>
            </select>
        </div>
        <div className="col-md-3 text-center">
            <p>Tanggal</p>
            <input className=" form-control" type="date" name="date" id="date" />
        </div>
        <div className="col-md-3 text-center ">
            <p>Waktu Jemput / Ambil</p>
            <select className="form-select" id="time" name="time">
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="12:00">12:00</option>
            </select>
        </div>
        <div className="col-md-3 text-center">
            <p>Jumlah Penumpang (optional)</p>
            <input className="form-control" type="text" name="pessenger" id="pessenger" />
            <div className="text-end mt-3">
                <button id="search-car" className="btn btn-success">Cari Mobil</button>
            </div>
        </div>
    </section>
    )
}

export default Filter