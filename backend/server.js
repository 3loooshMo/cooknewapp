import  express  from 'express'
import dotenv from 'dotenv'
import {userRouter} from './routes/authRoutes.js'
dotenv.config();
import cors from 'cors'
import { addUserRoute } from './routes/addUserRoute.js';
import { catogresRoute } from './routes/categoryRoutes.js';
import { ProductRouter } from './routes/productRoutes.js';
import { OrderRouter } from './routes/orderRoute.js';

const app = express()

const corsOrigin = {
    origin: [
        'http://localhost:3000',
    ], 
    credentials:true,            
}
app.use(cors(corsOrigin))
app.use(express.json())
app.use ('/upload', express.static('/Users/3laa/Desktop/ReactApp/ReactApp/new/backend/upload'));
// ROUTES
app.get('/', (req, res) => {
    res.json('Welcome')
})

app.use('/api/auth', userRouter)
app.use('/', addUserRoute)
app.use('/', catogresRoute)
app.use('/', ProductRouter)
app.use('/', OrderRouter)
const port = process.env.PORT ||8001
app.listen(port, () => console.log(`server on port ${port}`))