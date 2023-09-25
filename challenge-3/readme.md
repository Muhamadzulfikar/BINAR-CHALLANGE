
# Express.js API Application for Car Data

This is an Express.js application project that serves as an API for managing car data. This API supports several HTTP methods such as GET, POST, PUT, DELETE, and display car data. Here is a brief guide to running this project.


## Tech Stack

**Server:** Node, Express


## Instalasi

Install challange-3 with npm

```bash
  npm install
```

    
## API Reference


#### Get all cars

```http
  GET localhost:8000/cars
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` |Return all cars data|

#### Get cars item

```http
  GET localhost:8000/cars/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | Return car data that has a matching uuid|

#### Post cars

```http
  POST localhost:8000/cars
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | Return uploaded data|

#### Update cars item

```http
  PUT localhost:8000/cars/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | Return updated data|

#### Delete cars item

```http
  DELETE localhost:8000/cars/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | Return status code 204|


## Example Json Data

```json
[
    {
      "id": 1,
      "uuid": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
      "image": "./images/car01.min.jpg",
      "rentPerDay": 200000,
      "capacity": 2,
      "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      "availableAt": "2022-03-23T15:49:05.563Z"
    }
]

```
## Authors

- [@muhamadZulfikar](https://www.github.com/muhamadZulfikar)

