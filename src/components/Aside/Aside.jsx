import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../redux/categories/categories";

const Aside = () => {

    const {data} = useSelector(store => store.categories)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <aside className="aside">
            <div className="aside__top">
                <h2 className="aside__title">
                    CATEGORIES
                </h2>
                <ul className="aside__list">
                    {
                        data?.map((item) => (
                            <Link to={`/categories/${item.id}`} key={item.id} className="aside__item">
                                {item.name}
                            </Link>
                        ))
                    }

                </ul>
            </div>
            <div className="aside__bottom">
                <a href="" className="aside__bottom-link">Help</a>
                <a href="" className="aside__bottom-link">Terms & Conditions</a>
            </div>
        </aside>
    );
};

export default Aside;