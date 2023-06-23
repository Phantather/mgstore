import React from 'react';
import product from "../../assets/images/product.png";
import {Link} from "react-router-dom";

const WorthCard = ({item,key}) => {

    return (
        <Link to={`/categories/${item.id}`} className="trending__card worth__card">
            <img src={item.image} alt="" className="trending__card-img"/>
            <h3 className="worth__card-title">
                {item.name}
            </h3>
        </Link>
    );
};

export default WorthCard;