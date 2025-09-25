import Home from "../pages/home/Home"
import { Route, Routes } from "react-router-dom"

export default function Rotas(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    );
}