import React,{useEffect} from 'react';
import Begin from "./Begin/Begin";
import Trending from "./Trending/Trending";
import Worth from "./Worth/Worth";
import New from "./New/New";
import {useDispatch, useSelector} from "react-redux";

import {getProduct} from "../../redux/products/products";

const Home = () => {
    const dispatch = useDispatch()
    const {data} = useSelector(store => store.products)
    useEffect(() => {
        dispatch(getProduct())
    },[])
    return (
        <main>
            <div className="container">
                <Begin/>
                <Trending title={'Trending'} limit={5}/>
                <Worth/>
                <New/>
                <Trending less={'Less than 100$'} price={100} data={data} limit={5}/>
            </div>
        </main>
    );
};

export default Home;