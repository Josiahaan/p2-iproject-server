# HACKSTORE API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /pulsa`
- `POST /payment`
- `GET /cartitem`
- `POST /cartitem`
- `DELETE /cartitem/:id`

&nbsp;

## 1. POST /register

Request:
- Post register user to database

 - body:

 ```json
 {
   "fullname": "admin",
   "email": "admin@admin.com",
   "password": "admin",
   "phoneNumber": "081218293201",
   "address": "Jl menteng wadas IV"
 }
 ```

 _Response (201 - Created)_

 ```json
 {
   "id": 4,
   "fullname": "admin",
   "email": "admin@admin.com",
   "password": "$2b$10$5hkQ2lntfBnrrq4GtNwu9etsRNZs1Nm5d6B0z3a2wdrp1CgJFFqd6",
   "phoneNumber": "081218293201",
   "address": "Jl menteng wadas IV",
   "updatedAt": "2022-03-23T09:29:55.114Z",
   "createdAt": "2022-03-23T09:29:55.114Z",
 }
 ```

 Request:

 - body:

 ```json
 {
   "fullname": "",
   "email": "",
   "password": "",
   "phoneNumber": "",
   "address": ""
 }
 ```

 _Response (400 - Bad Request)_

 ```json
 {
   "message": [
     "Fullname is required",
     "Email is required",
     "Invalid email format",
     "Password is required"
   ]
 }
 ```

 OR

 ```json
 {
   "message": ["email must be unique"]
 }
 ```

 _Response (500 - Internal Server Error)_

 ```json
 {
   "message": "internal server error"
 }
 ```

 &nbsp;

 ## 2. POST /login

 Request:

 - body:

 ```json
 {
   "email": "admin@admin.com",
   "password": "admin"
 }
 ```

 _Response (200 - OK)_

 ```json
 {
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MjIzNzY0fQ.AnBcxahxShDOO9JxQwYiYmzEXfF5LhHT24KKGI2cJSc"
 }
 ```

 _Response (401 - Unauthorized)_

 ```json
 {
   "message": "invalid email/password"
 }
 ```

 &nbsp;

 ## 3. GET /pulsa

 Description:

 - Get all Product from API

_Response (200 - OK)_

```json

 [
    {
        "product_code": "alfamart10",
        "product_description": "Alfamart Voucher",
        "product_nominal": "Voucher Alfamart Rp 10.000",
        "product_details": "-",
        "product_price": 10000,
        "product_type": "voucher",
        "active_period": "0",
        "status": "active",
        "icon_url": "https://cdn.mobilepulsa.net/img/product/operator_list/140119034649-Alfa-01.png"
    },
    {
        "product_code": "alfamart100",
        "product_description": "Alfamart Voucher",
        "product_nominal": "Voucher Alfamart Rp 100.000",
        "product_details": "-",
        "product_price": 100000,
        "product_type": "voucher",
        "active_period": "0",
        "status": "active",
        "icon_url": "https://cdn.mobilepulsa.net/img/product/operator_list/140119034649-Alfa-01.png"
    },
    ...
 ]  
 ```

 _Response (500 - Internal Server Error)_

 ```json
 {
   "message": "internal server error"
 }
 ```

 &nbsp;

 ## 4. POST /payment

  - Using endpoints to pay product

  - headers:

 ````json
 {
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjdXN0b21lcjFAY3VzdG9tZXIuY29tIiwiaWF0IjoxNjQ3NDMxNjU1fQ.7tOseJy9Q_1dDmUJBCpikqgm8hlY7P6feaL0PKefeHU"
 }

_Response (200 - OK)_

```json
{
  "token": '162cca0f-9fb1-414e-9f0f-cee95792c411',
  "redirect_url": 'https://app.sandbox.midtrans.com/snap/v2/vtweb/162cca0f-9fb1-414e-9f0f-cee95792c411'
}
```
 _Response (500 - Internal Server Error)_

 ```json
 {
   "message": "internal server error"
 }
 ```

&nbsp;

## 5. GET /cartitem

- Get all user cart 

- headers:

 ````json
 {
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjdXN0b21lcjFAY3VzdG9tZXIuY29tIiwiaWF0IjoxNjQ3NDMxNjU1fQ.7tOseJy9Q_1dDmUJBCpikqgm8hlY7P6feaL0PKefeHU"
 }

_Response (200 - OK)_

```json
[
    {
        "cart": {
            "product_code": "alfamart10",
            "product_description": "Alfamart Voucher",
            "product_nominal": "Voucher Alfamart Rp 10.000",
            "product_details": "-",
            "product_price": 10000,
            "product_type": "voucher",
            "active_period": "0",
            "status": "active",
            "icon_url": "https://cdn.mobilepulsa.net/img/product/operator_list/140119034649-Alfa-01.png"
        },
        "id": 8,
        "quantity": 1,
        "UserId": 1
    },
    {
        "cart": {
            "product_code": "alfamart10",
            "product_description": "Alfamart Voucher",
            "product_nominal": "Voucher Alfamart Rp 10.000",
            "product_details": "-",
            "product_price": 10000,
            "product_type": "voucher",
            "active_period": "0",
            "status": "active",
            "icon_url": "https://cdn.mobilepulsa.net/img/product/operator_list/140119034649-Alfa-01.png"
        },
        "id": 9,
        "quantity": 1,
        "UserId": 1
    },
    ...
]
```
 _Response (500 - Internal Server Error)_

 ```json
 {
   "message": "internal server error"
 }
 ```

&nbsp;

## 6. POST /cartitem

- Add product to user cart

- headers:

 ````json
 {
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjdXN0b21lcjFAY3VzdG9tZXIuY29tIiwiaWF0IjoxNjQ3NDMxNjU1fQ.7tOseJy9Q_1dDmUJBCpikqgm8hlY7P6feaL0PKefeHU"
 }

_Response (200 - OK)_

```json
CartItem {
  dataValues: {
    id: 22,
    quantity: 0,
    cart: '{"product_code":"alfamart10","product_description":"Alfamart Voucher","product_nominal":"Voucher Alfamart Rp 10.000","product_details":"-","product_price":10000,"product_type":"voucher","active_period":"0","status":"active","icon_url":"https://cdn.mobilepulsa.net/img/product/operator_list/140119034649-Alfa-01.png"}',
    UserId: 1,
    updatedAt: 2022-03-24T02:27:23.438Z,
    createdAt: 2022-03-24T02:27:23.438Z
  },
}
```

 _Response (500 - Internal Server Error)_

 ```json
 {
   "message": "internal server error"
 }
 ```

&nbsp;

## 5. DELETE /cartitem/:id

- Delete user cart

_Response (200 - OK)_

```json
{
  "message": "success cancel product"
}
OR
{
  "message": "success cart deleted"
}
```

 _Response (500 - Internal Server Error)_

 ```json
{
  "message": "internal server error"
}
 ```

&nbsp;