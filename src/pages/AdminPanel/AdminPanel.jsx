import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addProduct, deleteProduct, getProduct, updateProduct} from "../../redux/products/products";
import {useNavigate,Link} from "react-router-dom";


const AdminPanel = () => {

    const dispatch = useDispatch()
    const {data} = useSelector(store => store.products)
    const loading = useSelector(store => store.products.isLoading)
    const error = useSelector(store => store.products.error)

    useEffect(() => {
        dispatch(getProduct())
    },[dispatch,updateProduct])

    const navigate = useNavigate()
    const handleDelete = (productID) => {
        dispatch(deleteProduct(productID))
    }

    const [newProduct, setNewProduct] = useState({
        title: "",
        price: 0,
        category: {
            id: 0,
            name: ""
        },
        images: ""
    })

    const handleAdd = () => {
        dispatch(addProduct(newProduct))
        setNewProduct({
            title: "",
            price: 0,
            category: {
                id: 0,
                name: ""
            },
            images: ""
        })
    }

    if (loading) {
        return <h2>Loading</h2>
    }

    if (error) {
        return <h2>Error {error}</h2>
    }
    return (
        <section className="admin-panel">
            <h2 className="admin-panel__title">
                Admin Panel
            </h2>
            <button className="admin-panel__add">
                Add Product
            </button>
            <div className="admin-panel__newProduct">
                <input
                    type="text"
                    placeholder="Title"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value}) }
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value}) }
                />
                <input
                    type="text"
                    placeholder="idCat"
                    value={newProduct.category.id}
                    onChange={(e) => setNewProduct({...newProduct, category: {id: e.target.value}}) }
                />
                <input
                    type="text"
                    placeholder="name"
                    value={newProduct.category.name}
                    onChange={(e) => setNewProduct({...newProduct, category: {name: e.target.value}}) }
                />
                <input
                    type="text"
                    placeholder="image"
                    value={newProduct.images}
                    onChange={(e) => setNewProduct({...newProduct, images: e.target.value}) }
                />
                <button onClick={
                    handleAdd
                }>add</button>
            </div>
            <ul className="admin-panel__list">
                {

                    data.map((item, idx) => (
                        <Link to={`/adminProduct/${item.id}`}>
                            <li key={item.id || idx} className="admin-panel__item">
                                <p className="admin-panel__item-id">
                                    {item.id}
                                </p>
                                <p className="admin-panel__item-title">
                                    {item.title}
                                </p>
                                <p className="admin-panel__item-price">
                                    {item.price}$
                                </p>
                                <div className="admin-panel__item-btns">
                                    <button className="admin-panel__item-btn"
                                            onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                    <button className="admin-panel__item-btn">
                                        Update
                                    </button>
                                </div>
                            </li>
                        </Link>

                    ))
                }

            </ul>

        </section>
    );
};

export default AdminPanel;