import { useState, useEffect } from "react"
import { db } from "../data/db"
import { useMemo } from "react"

export  const useCart = () => {

const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart")
    if (localStorageCart) { 
        return JSON.parse(localStorageCart)
    } else {
        return []
    }
}
    //Siendo un catalogo fijo podriamos ahorrarnos este useState
    const [data] = useState(db)
    const [cart,setCart] = useState(initialCart)

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function addToCart (item){
        const itemExists = cart.findIndex((guitar)=> guitar.id===item.id)
        if(itemExists>=0 ){
            if(cart[itemExists].quantity>=5)
                return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else{
            //agregamos una propiedad nueva asi tambien
            item.quantity = 1
            setCart([...cart, item])
        }  
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar=>guitar.id!==id))
    }

    function increaseQuantity(id){
        const updatedCart = cart.map(item =>{
            if(item.id===id && item.quantity < 5){
                return{
                    ...item,
                    quantity: item.quantity+1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id){
        const updateCart = cart.map(item=>{
            if(item.id===id&&item.quantity>1){
                return{
                    ...item,
                    quantity: item.quantity-1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart(){
        setCart([])
    }

        //state derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, i) =>
                        total + (i.quantity * i.price), 0), [cart])

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}