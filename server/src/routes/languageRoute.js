import express from 'express'
import  { switchLanguage }  from '../controllers/languageController.js'

const router = express.Router()

router.post('/translate/:target' , switchLanguage)


export default router