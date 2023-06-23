import React,{useEffect} from 'react';
import Aside from "../../components/Aside/Aside";

import product from '../../assets/images/product.png'
import {useDispatch, useSelector} from "react-redux";
import {deleteCard, addCount, deleteCount, addCart} from "../../redux/user/user";



const Cart = () => {
    const dispatch = useDispatch()
    const {user:{cart}} = useSelector(store => store.user)

    return (
        <div className="cartPage">
            <aside className="aside">
                <Aside/>
            </aside>
            <section className="cart">
                <h2 className="cart__title">
                    Your cart
                </h2>
                <div className="cart__row">
                    {
                        cart.map(product => (
                            <div className="cart__card">
                                <div className="cart__card-info">
                                    <img src={product.images[0]} alt=""/>
                                    <div>
                                        <h3 className="cart__card-title">
                                            {product.title}
                                        </h3>
                                        <p className="cart__card-category">
                                            {product.category.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="cart__card-sale">
                                    <p className="cart__card-price">
                                        {product.price} $
                                    </p>
                                    <div className="cart__card-counter">
                                        <button onClick={() => dispatch(deleteCount(product))} className="cart__card-btn">
                                            -
                                        </button>
                                        <span className="cart__card-count">
                                        {product.count}
                                        </span>
                                        <button onClick={() => dispatch(addCount(product))} className="cart__card-btn plus">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="cart__card-end">
                                    <p className="cart__card-price">
                                <span>
                                    {
                                        product.price * product.count
                                    }$
                                </span>
                                    </p>
                                    <button onClick={() => dispatch(deleteCard(product))} className="cart__card-delete">
                                        x
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="cart__bottom">
                    <p className="cart__bottom-price">
                        TOTAL PRICE: <span>{
                            cart.reduce((acc,rec) => acc+(rec.price * rec.count),0)
                    }</span>
                    </p>
                    <button className="btn">
                        Proceed to checkout
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Cart;