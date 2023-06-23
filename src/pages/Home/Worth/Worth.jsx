import React from 'react';
import WorthCard from "../../../components/WorthCard/WorthCard";
import {useSelector} from "react-redux";

const Worth = () => {

    const {data} = useSelector(store => store.categories)
    return (
        <section className="worth">
            <h2 className="trending__title title">
                Worth seeing
            </h2>
            <div className="trending__row worth__row">
                {
                    data.map(item => (
                        <WorthCard  item={item}/>
                    ))
                }

            </div>
        </section>
    );
};

export default Worth;