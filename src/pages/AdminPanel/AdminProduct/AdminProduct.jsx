import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useGetProductQuery} from "../../../redux/api/api";
import {useDispatch} from "react-redux";
import {getProduct, updateProduct} from "../../../redux/products/products";

const AdminProduct = () => {
    const {id} = useParams()
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({id});
    const [update,setUpdate] = useState({

    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        setUpdate(data)
    },[isLoading])

    const handleChange = (e) => {
       setUpdate( {...update,[e.target.name]: e.target.value})
    }
    const handleChangeCategory = (e) => {
        setUpdate( {...update,category:{
                ...update.category,name: e.target.value
                }})
    }
    const onSubmit = () => {
        dispatch(updateProduct(update))
        navigate("/admin-panel")
    }
     return (
        <section className={"admin-product"}>
            <form onSubmit={onSubmit}  className="login__form" >
                <h2 style={{color:"white"}}>Update</h2>
                <div className="login__form-block">
                    <input type="text" name="title" value={update?.title} onChange={handleChange} className="login__form-input"/>
                </div>
                <div className="login__form-block">
                    <input type="text" name="price" value={update?.price}  onChange={handleChange} className="login__form-input"/>

                </div>
                <div className="login__form-block">
                    <input type="text" name="name" value={update?.category?.name} onChange={handleChangeCategory} className="login__form-input"/>
                </div>
                <div className="login__form-block">
                    <button className="login__form-btn" type={"submit"}>
                        Изменить
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AdminProduct;