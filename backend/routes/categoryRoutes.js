import express from 'express'
import { addCategory, deleteCategorie, editCategorie, getCategorie, getCategories } from '../controllers/catogresController.js'
const router = express.Router()
import multer from 'multer'
const photosMiddleware = multer ({dest: 'upload'});
router.post('/add-category',photosMiddleware.array('file_name',100),  addCategory)
router.get('/get-categories',  getCategories)
router.get('/get-categories/:id',  getCategorie)
router.delete('/delete-categories/:id',  deleteCategorie)
router.put('/edit-categories/:id',  editCategorie)

export { router as catogresRoute }