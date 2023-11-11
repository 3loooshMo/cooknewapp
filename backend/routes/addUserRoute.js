import express from 'express'
const router = express.Router()
import {addUserController }from '../controllers/addUserController.js';
router.post('/adduser', addUserController)
export { router as addUserRoute }

