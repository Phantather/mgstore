import React, {useEffect} from 'react';
import Card from "../../../components/Card/Card";
import {getProduct, updateProduct} from "../../../redux/products/products";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";


const Trending = ({title, less,price,limit}) => {
    const dispatch = useDispatch()
    const {data} = useSelector(store => store.products)
    useEffect(() => {
        dispatch(getProduct())
    },[])

    return (
        <section className="trending">
            <h2 className="trending__title title">
                {title || less}
            </h2>
            <div className="trending__row">

                {price ? data.filter((item,idx) => item.price <= 100 ).filter((item,idx) => idx < limit).map(item => (

                        <Card item={item}/>


                    ))
                    :
                    data.filter((item,idx) => idx < limit).map(item => (
                    <Card item={item}/>
                    ))
                }
            </div>
            {/*<button className="trending__btn btn">*/}
            {/*    See more*/}
            {/*</button>*/}
        </section>
    );
};

export default Trending;