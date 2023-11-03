const WhyUs = () => {
    return (
        <section className="why-us">
        <h1 className="fw-bold why-us-heading">Why Us</h1>
        <p className="why-us-sub-heading">Mengapa harus pilih Binar Car Rental?</p>

        <section className="why-us-list-item d-flex flex-column flex-md-row gap-4 gap-md-0 w-100">
            <section className="why-us-list-item-card border border-1 p-4 rounded">
                <img className="" src="Asset/Image/icon_complete.png" alt="" />
                <p className="fw-bold mt-3">Mobil Lengkap</p>
                <p className="mt-3">Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat</p>
            </section>
            <section className="why-us-list-item-card border border-1 p-4 rounded">
                <img src="Asset/Image/icon_price.png" alt="" />
                <p className="fw-bold mt-3">Harga Murah</p>
                <p className="mt-3">Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain</p>
            </section>
            <section className="why-us-list-item-card border border-1 p-4 rounded">
                <img src="Asset/Image/icon_24hrs.png" alt="" />
                <p className="fw-bold mt-3">Layanan 24 Jam</p>
                <p className="mt-3">Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu
                </p>
            </section>
            <section className="why-us-list-item-card border border-1 p-4 rounded">
                <img src="Asset/Image/icon_professional.png" alt="" />
                <p className="fw-bold mt-3">Sopir Profesional</p>
                <p className="mt-3">Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu</p>
            </section>
        </section>
    </section>
    )
}

export default WhyUs