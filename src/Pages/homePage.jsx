import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "../componentes/header"
import ProductPage from "../componentes/productPage"
import ProductOverView from "./productOverViewPage"

export default function HomePage(){
    return(
        <div className= "w-full h-full overflow-y-scroll max-h-full ">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)] ">

            <Routes>
                <Route path="/" element={<h1>HomePage</h1>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/about" element={<h1>Abut Page</h1>}/>
                <Route path="/contact" element={<h1>Contact Page</h1>}/>
                <Route path="/*" element={<h1>Page Not found</h1>}/>
                <Route path="/overview/:productID" element={<ProductOverView/>}/>

            </Routes>
            </div>


            
        </div>
    )
}