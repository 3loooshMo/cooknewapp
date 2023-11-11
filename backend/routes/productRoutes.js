import express from 'express'
import { addProduct, deleteProduct, editProduct, getItems, getProduct, getProductName, getProducts } from '../controllers/productController.js'
const router = express.Router()
import multer from 'multer'
const photosMiddleware = multer ({dest: 'upload'});
router.post('/add-product',photosMiddleware.array('file_name',100), addProduct)
router.get('/get-product', getProducts)
router.get('/get-product-name', getProductName)
router.get('/get-product/:id', getProduct)
router.get('/get-prodect-items/:id', getItems)
router.delete('/delete-product/:id', deleteProduct)
router.put('/edit-product/:id', editProduct)

export {router as ProductRouter}