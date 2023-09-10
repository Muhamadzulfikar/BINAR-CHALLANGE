class App {
  constructor() {
    this.searchCar = document.getElementById("search-car");
    this.driverType = document.getElementById('driver_type');
    this.date = document.getElementById('date');
    this.time = document.getElementById('time');
    this.pessenger = document.getElementById('pessenger');
    this.containerCar = document.getElementById('container-car');
    this.searchCar.onclick = this.run;
  }

  async init() {
    await this.load();
  }

  run = async () => {
     // Periksa apakah input sudah diisi dengan nilai
     if (!this.date.value || !this.time.value || !this.pessenger.value) {
      alert("Silakan isi semua input terlebih dahulu");
      return;
    }
    
    this.clear();
    this.containerCar.classList.toggle('d-none');
    const date = this.date.value;
    const time = this.time.value;
    const pessenger = this.pessenger.value;

    const fullDateTime = new Date(`${date} ${time}`);

    function filterCar(car){
      return car.available && car.capacity >= pessenger && new Date(car.availableAt).getTime() >= fullDateTime
    }
    
    const cars = await Binar.listCars(filterCar);

    console.log(cars);

    // if(cars.length === 0){
    //   const node = document.createElement("div");
    //   node.innerHTML = 'Maaf mobilnya kosong broo....';
    //   this.carContainerElement.appendChild(node);
    //   return;
    // }

    Car.init(cars);

    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-md-4");
      // node.classList.add("mb-4");
      // node.classList.add("rounded");
      node.innerHTML = car.render();
      this.containerCar.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars(this.filterCar);
    Car.init(cars);
  }

  clear = () => {
    let child = this.containerCar.firstElementChild;

    while (child) {
      child.remove();
      child = this.containerCar.firstElementChild;
    }
  };
}
