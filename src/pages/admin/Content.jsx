import React, { useEffect, useState } from "react";
import '../../css/content.css'
import axios from "axios";
import { toast } from "react-toastify";
let data = null
const Content = () => {
  const [order, setOrder] = useState([])
  const [disable, setDisable] = useState(true)
  const [toDateFormat, setToDateFormat] = useState("")
  const [fromDateFormat, setFromDateFormat] = useState("")
  const [user, setUsers] = useState([])
  const [catogres, setCatogres] = useState([])
  const [orderDate, setOrderDate] = useState([])
  const [product, setProduct] = useState([])
  const [countPrice, setcCuntPrice] = useState({})
  let date = new Date()
  useEffect(() => {
    axios.get('http://localhost:8000/get-order-name')
      .then((result) => {
        if (result.data.state) {
          setOrder(result.data.order)
        } else {
          console.log('result', result)
        }
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:8000/get-ccount-price')
      .then((result) => {
        if (result.data.state) {
          setcCuntPrice(result.data.order[0])
        } else {
          console.log('result', result)
        }
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:8000/get-categories')
      .then((result) => {
        if (result.data.state) {
          setCatogres(result.data.categories);

        } else {
          // toast.error("اسم الستخدم موجود بالفعل")
        }
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:8000/get-product')
      .then((result) => {
        if (result.data.state) {
          setProduct(result.data.products);
        } else {
          // toast.error("اسم الستخدم موجود بالفعل")
        }
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:8000/api/auth/users')
      .then((result) => {
        if (result.data.state) {
          setUsers(result.data.user);
        } else {
          // toast.error("اسم الستخدم موجود بالفعل")

        }
      })
      .catch(err => console.log(err))
      axios.get('http://localhost:8000/get-order-date/'+toDateFormat+'/'+fromDateFormat)
      .then((result) => {
        if (result.data.state) {
          setOrderDate(result.data.order)
        } else {
          setOrderDate(result.data)
        }
      })
      .catch(err => console.log(err))

  }, [fromDateFormat,toDateFormat])
  console.log(countPrice[0])
  const handelToDate = (e) => {
    const getToDateValue = e.target.value;
    setToDateFormat(getToDateValue)
    console.log(toDateFormat)
    setDisable(false)
  }
  const handelFromDate = (e) => {
    const getFromDateValue = e.target.value;
      setFromDateFormat(getFromDateValue);
    console.log(fromDateFormat)

  }
  return (
    <>
      <div className="content-home">
        <div className="report">
          <div className="catogry-list">
            <p>عدد المستخدمين</p>
            <p>{user.length}</p>
          </div>
          <div className="catogry-list">
            <p>عدد الاصناف</p>
            <p>{catogres.length}</p>
          </div>
          <div className="catogry-list">
            <p>عدد الممنتجات</p>
            <p>{product.length}</p>
          </div>
          <div className="catogry-list">
            <p>عدد المبييعات </p>
            <p>{countPrice.count ? countPrice.count : 0}</p>
          </div>
          <div className="catogry-list">
            <p>قيمة المبيعات </p>
            <p> {countPrice.price ? countPrice.price : 0}</p>
          </div>
        </div>
        <div className="date">
          {date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}
        </div>
        <div className="dayley-report">
          {
            order.length > 0 ?
              <table>
                <thead>
                  <tr>
                    <td>الاسم</td>
                    <td>الكمية</td>
                    <td>المبلغ</td>
                    <td>الستخدم</td>
                  </tr>
                </thead>
                <tbody>

                  {
                    order.map(i => (
                      <tr key={i.id}>
                        <td> {i.name}</td>
                        <td>{i.count}</td>
                        <td>{i.price}</td>
                        <td>{i.user}</td>
                      </tr>
                    ))
                  }


                </tbody>

              </table>
              : <h1>لا توجد تقارير لليوم</h1>
          }
        </div>
         <div className="from-to-report">
          <div className="form-to-input">
            <label> من</label>
            <input type="date" onChange={(e) => handelToDate(e)} />
            <label> الي</label>
            <input type="date" disabled={disable} onChange={(e) => handelFromDate(e)} />
          </div>
          {orderDate.length > 0 ? <div className="dayley-report">
            <table>
              <thead>
                <tr>
                  <td>#</td>
                  <td>الاسم</td>
                  <td>الكمية</td>
                  <td>المبلغ</td>
                  <td>الستخدم</td>
                </tr>
              </thead>
              <tbody>

                {
                  orderDate.map(i => (
                    <tr key={i.id}>
                      <td >{i.date}</td>
                      <td> {i.name}</td>
                      <td>{i.count}</td>
                      <td>{i.price}</td>
                      <td>{i.user}</td>
                    </tr>
                  ))
                }


              </tbody>

            </table>
          </div>:<h1>لا توجد بيانات</h1>}
        </div>
      </div>

    </>
  );
};
export default Content;
