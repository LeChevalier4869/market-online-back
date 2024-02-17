# ENV Guide

PORT=

JWT_SECRET=
JWT_EXPIRES_IN=

-----------------------------------------------------------------------

# Notes

MVC (Models, Route + Controller, View)

----------------------------------------------------------------------

# API Service

-------------------------------------------------------------------------------
## Auth

### Register

method: POST
path: /auth/register
authen: false
params: -
body: { firstName, lastName, phone, email, username, password }

------------------------------------------------------------------
### Login

method: POST
path: /auth/login
authen: false
params: -
body: { username, password }

-------------------------------------------------------------------
### me

method: GET
path: /auth/me
authen: true
params: -
body: -

-------------------------------------------------------------------

## Admin

### Create product by admin

method: POST
path: /admin/product
authen: true
params: -
body: { name, stock, unit, price, detail, brandId, categoryId }

-------------------------------------------------------------------
### Update product by admin

method: PATCH
path: /admin/product
authen: true
params: productId
body: { name, stock, unit, price, detail, brandId, categoryId }

-------------------------------------------------------------------
### Create category by admin

method: POST
path: /admin/category
authen: true
params: -
body: { name }

-------------------------------------------------------------------
### Create brand by admin

method: POST
path: /admin/brand
authen: true
params: -
body: { name }

-------------------------------------------------------------------
### Create promotion by admin


method: POST
path: /admin/promotion
authen: true
params: -
body: { name, bannerUrl, discount, point }


-------------------------------------------------------------------
### Show admin's product


method: GET
path: /admin/product/landing
authen: true
params: -
body: -


-------------------------------------------------------------------

## Product

### Show product landing

method: GET
path: /product/landing
authen: false
params: -
body: -

-------------------------------------------------------------------
### Show product from query

method: GET
path: /product?
authen: false
params: categoryName (front-end)
body: -
query: { search, brand, category }

-------------------------------------------------------------------
### Show product by id

method: GET
path: /product/
authen: false
params: productId
body: -

-------------------------------------------------------------------

## Category

### Show category landing

method: GET
path: /category/landing
authen: false
params: -
body: -

-------------------------------------------------------------------
### Show category by id

method: GET
path: /category/
authen: false
params: categoryId
body: - 

--------------------------------------------------------------------

## Brand

### Show brand by id

method: GET
path: /brand/
authen: false
params: brandId
body: -

-------------------------------------------------------------------------------

## Promotion

### Show promotion landing

method: GET
path: /promotion/landing
authen: false
params: -
body: -

-------------------------------------------------------------------------------
### Show promotion by id

method: GET
path: /promotion/
authen: false
params: promotionId
body: -

-------------------------------------------------------------------------------