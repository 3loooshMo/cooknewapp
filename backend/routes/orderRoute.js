import express from 'express'
import { addOrder, addOrderReport, getOrderDetales, getOrdersByName, getOrdersDateBetween, getPriceCountOrder } from '../controllers/ordercController.js'
const router = express.Router()

router.post('/add-order', addOrder)
router.get('/get-order-name', getOrdersByName)
router.get('/get-order-date/:date_one/:date_tow', getOrdersDateBetween)
router.post('/add-report', addOrderReport)
router.get('/get-order-detales', getOrderDetales)
router.get('/get-ccount-price', getPriceCountOrder)

export {router as OrderRouter}