import React from 'react';
import {useGetProductQuery} from "../../redux/api/api";
import {useParams} from "react-router-dom";
import Aside from "../../components/Aside/Aside";
import Product from "../../components/Product/Product";
import SimilarSlider from "../../components/SimilarSlider/SimilarSlider";

const SingleProduct = () => {



    const {id} = useParams()

    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({id});

    const memory = [64, 128, 256]

    return (
        <section className="single">
            <div className="container">
                <div className="single__row">
                    <Aside/>
                    <Product data={data}/>
                </div>
                <SimilarSlider id={id} dataProduct={data}/>
            </div>
        </section>
    );
};

export default SingleProduct;