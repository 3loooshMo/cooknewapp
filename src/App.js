import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/admin/Home"
import PrivateRoute from "./pages/PrivateRoute"
import Content from "./pages/admin/Content"
import AddProduct from "./pages/admin/AddProoduct"
import AddUser from "./pages/admin/AddUser"
import HomeCacher from "./pages/HomeCacher"
import Items from "./pages/Items"
import OrderPrint from "./pages/OrderPrint"
import AddCatogres from "./pages/admin/AddCatogres"
import Catogres from "./pages/admin/Catogres"
import CatogresList from "./pages/admin/CatogresList"
import Product from "./pages/admin/Product"
import ProductList from "./pages/admin/ProductList"
import Users from "./pages/admin/Users"
import UserList from "./pages/admin/UserList"
import MenuItems from "./components/MenuItems"
import EditUser from "./pages/admin/EditUser"
import EditCaatogres from "./pages/admin/EditCaatogres"
import EditProduct from "./pages/admin/EditProduct"
import Empty from "./components/Empty"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
axios.defaults.baseURL="http://localhost:8000"

const App = () => {

  return (
    <>
    <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/print" element={<OrderPrint />} />
          <Route path='/home-admin' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          >
            <Route path='' element={<Content />} />
            <Route path='product' element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>} >
              <Route path="add" element={<AddProduct />} />
              <Route path="list" element={<ProductList />} />
              <Route path="edit/:id" element={<EditProduct />} />
            </Route>
            <Route path='catogres' element={
              <PrivateRoute>
                <Catogres />
              </PrivateRoute>} >
              <Route path="add" element={<AddCatogres />} />
              <Route path="list" element={<CatogresList />} />
              <Route path="edit/:id" element={<EditCaatogres />} />
            </Route>
            <Route path='users' element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>} >
              <Route path="add" element={<AddUser />} />
              <Route path="list" element={<UserList />} />
              <Route path="edit/:id" element={< EditUser />} />
            </Route>
          </Route>
          <Route path='/home'
            element={
              <PrivateRoute>
                <HomeCacher />
              </PrivateRoute>
            }
          >
            
            <Route path=':id'
              element={
                  <Items />
              }>
              </Route>
            <Route path=":id" element={<MenuItems />} />
          </Route>
        </Routes>
      </Router>
      
    </>
  )
}
export default App
