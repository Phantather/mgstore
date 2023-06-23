import React, { useEffect, useState } from 'react';
import Begin from "../Home/Begin/Begin";
import { useDispatch } from "react-redux";

import { getProduct } from "../../redux/products/products";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/api";
import Card from "../../components/Card/Card";

const Categories = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const defaultParams = {
        price_gte: 0,
        price_lte: 2000,
        "category.id": id,
        title_like: '',
        _limit: 5
    };

    const [params, setParams] = useState(defaultParams);
    const { data } = useGetProductsQuery(params);

    useEffect(() => {
        setParams((prevParams) => ({
            ...prevParams,
            "category.id": id,
            _limit : 5
        }));
    }, [id]);

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    const handlerChange = (e) => {
        setParams({ ...params, title_like: e.target.value });
    };

    const priceChange = (e) => {
        setParams({ ...params, price_gte: e.target.value });
    };

    const priceMax = (e) => {
        setParams({ ...params, price_lte: e.target.value });
    };

    return (
        <section className="categories">
            <div className="container">
                <Begin />
                <section className="trending">
                    <h2 className="trending__title title"></h2>
                    <form className={"form__categories"} action="">
                        <div className="filter__category">
                            <input
                                type="text"
                                name={"title__like"}
                                placeholder={"Product name"}
                                onChange={handlerChange}
                            />
                        </div>
                        <div className="filter__category">
                            <input
                                type="number"
                                name="price__gte"
                                placeholder={"0"}
                                onChange={priceChange}
                            />
                        </div>
                        <div className="filter__category">
                            <input
                                type="number"
                                name={"price__lte"}
                                placeholder={"0"}
                                onChange={priceMax}
                            />
                        </div>
                    </form>
                    <div className="trending__row">
                        {data?.map((item) => (
                            <Card item={item} key={item.id} />
                        ))}
                    </div>
                    {
                        data?.length >= params._limit ?  <button className="trending__btn btn" onClick={() => setParams(prev => ({
                            ...prev,
                            _limit: prev._limit + 5
                        }))} >See more</button> : ""
                    }

                </section>
            </div>
        </section>
    );
};

export default Categories;
