class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class="card border-0">
        <img src="${this.image}" style="height:13.875rem; object-fit: cover;" class="card-img-top"
            alt="...">
        <div class="card-body">
            <p class="card-text">${this.model}</p>
            <h5 class="card-title">Rp ${this.rentPerDay} / hari</h5>
            <p class="card-text description-car">
                ${this.description}
            </p>
            <p><i class="fa fa-users" aria-hidden="true"></i> ${this.capacity} Orang</p>
            <p><i class="fa fa-cog" aria-hidden="true"></i> ${this.transmission}</p>
            <p><i class="fa fa-calendar-o" aria-hidden="true"></i> Tahun ${this.year}</p>
            <btn class="btn btn-success w-100">Pilih Mobil</b>
        </div>
    </div>
    `;
  }
}
