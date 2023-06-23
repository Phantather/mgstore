import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
//media
import './styles/style.scss'
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Categories from "./pages/Categories/Categories";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminProduct from "./pages/AdminPanel/AdminProduct/AdminProduct";



function App() {
    const user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : ""
    return (
        <div className="App">
            <Routes>
                <Route path={''} element={<Layout/>}>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/products/:id'} element={<SingleProduct/>}/>
                    <Route path={'/adminProduct/:id'} element={<AdminProduct/>}/>
                    <Route path={'/categories/:id'} element={<Categories/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                 <Route path={'/admin-panel'} element={<AdminPanel/>}/>

                </Route>
                    <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
