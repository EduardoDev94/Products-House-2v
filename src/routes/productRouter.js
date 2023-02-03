const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/ProductsController')

router.get ('/produto', ProductsController.showProdutos)

module.exports = router