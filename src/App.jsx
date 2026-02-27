import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCart } from "./hooks/useCart"

function App() {

const { data,cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity
    ,clearCart, isEmpty, cartTotal} = useCart()

    /*
    const [data, setData] = useState ([])
    //Asi mas usado para API, el cliente no sabe si esta cargando en caso contrario
    useEffect(()=>{
        setData(db)
    },[])
    */
    /*
    const[auth, setAuth] = useState(false)
    //Aqui si que se pueden usar if, pero no se puede meter
    //el useState en una condicional, funcion o tras el return
    useEffect(()=>{
        if(auth){
        console.log("Autenticado")
        }
    },[auth])
    // Los ; por si puede haber despues un ( o [ y que no se ejecute junto ala linea anteriro
    setTimeout(()=>{
        setAuth(true)
    }, 3000);
    */
  return (
    <>    
<Header
    cart={cart}
    clearCart={clearCart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    isEmpty={isEmpty}
    cartTotal={cartTotal}
/>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=> (
                <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                />
            )    
            )}
        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
