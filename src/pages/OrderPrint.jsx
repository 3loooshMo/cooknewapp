import React, { useContext, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ReactContext } from "../app/store";
import { toast } from "react-toastify";
import '../css/print.css'
import { Navigate } from "react-router-dom";
const OrderPrint = () => {
  const componentRef = useRef();
  const { order } = useContext(ReactContext);
  const user = localStorage.getItem("user")
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Awad burger",
    onAfterPrint: () => {
      handelNav()
      toast.success("print success")},
  });
  const handelNav = () => {
    Navigate('/home')
  }
  // useEffect(() => {
  //   handlePrint()
  //   // handelNav()
    
  // }, [])

  return (
    <>
      < div ref={componentRef}>
        <div className="order-detales">
        <br />
          <p>التاريخ :{order.data.date}</p>
          <br />
          <p>رقم الطلب :{order.data.order_id}</p>
          <br />
          <p>الاسم : {JSON.parse(user).name}</p>
          <br />
          <p>وسيلة الدفع : {order.data.payment_method}</p>
          <br />
          <p> نوع الطلب : {order.data.type}</p>
        </div>

        <div className="orders-detales">
          <div className="order-header">
            <p>الاسم</p>
            <p>السعر</p>
            <p>العدد</p>
          </div>
          <div className="divider"></div>
          {
            order.cart != null && !!order.cart.products > 0 ?
              <div >
                {
                  order.cart.products.map((item) =>
                  (
                    <div className="order-body" key={item.id}>
                      <p>{item.count != 0 && item.name}</p>
                      <p>{item.count != 0 && item.price * item.count}</p>
                      <p>{item.count != 0 && item.count}</p>
                    </div>

                  )
                  )
                }
              </div> : <h1>لا توجد بيانات</h1>
          }
        </div>
       
        <p className="sum-amount">  المجموع : {order.data.total_amount}</p>

        <div className="about">
        <p>01284449996</p>
          <p>علاء الدين محمد للبرمجيات </p>
          
        </div>
      </div>


      {/* <button className="order-status" onClick={() => handlePrint()}>
        Print
      </button> */}
    </>
  );
};

export default OrderPrint;
