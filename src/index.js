require('dotenv').config();

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const notFoundHandler = require('./middlewares/notFound');

const authRoute = require('./route/auth-route');
const adminRoute = require('./route/admin-route');
const productRoute = require('./route/product-route');
const categoryRoute = require('./route/category-route');
const brandRoute = require('./route/brand-route');
const promotionRoute = require('./route/promotion-route');

const authenticate = require('./middlewares/authenticate');
const admin = require('./middlewares/admin');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/product', productRoute);
app.use('/auth', authRoute);
app.use('/admin', authenticate, admin, adminRoute);
app.use('/category', categoryRoute);
app.use('/brand', brandRoute);
app.use('/promotion', promotionRoute);

app.use(errorHandler);
app.use('*', notFoundHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})