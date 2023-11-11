import React, { createContext, useEffect, useMemo, useState } from 'react'
const ReactContext = createContext({})

const Store =({ children }) =>{
    
    const [cart, setCart] = useState(null)
    const [order, setOrder] = useState([])
    const memoValues = useMemo(() => ({cart,setCart,order,setOrder}), [cart,setCart,order,setOrder])
    useEffect(() => {
       console.log('store',cart)
    }, [])
    return (
        <ReactContext.Provider value={memoValues}>
            {
                children
            }
        </ReactContext.Provider>
    )
}

export { Store, ReactContext }