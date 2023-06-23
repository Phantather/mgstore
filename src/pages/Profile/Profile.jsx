import React, {useEffect, useState} from 'react';
import Aside from "../../components/Aside/Aside";
import axios from "axios";
import {instance} from "../../utils/axios";
import {loginAcc, updateUser} from "../../redux/user/user";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()

    const {user} = useSelector(store => store.user)
    const [uuid,setUuid] = useState(
        {
            id:user.id,
            email:'',
            avatar:"",
            login:"",
        }
    )
    useEffect(() => {
        setUuid(user)
    },[user])



    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateUser(uuid))
    };
    const handleChange = ({ target: { value, name } }) => {
        setUuid({ ...uuid, [name]: value });
    };

    return (
        <section className="profile">
            <Aside/>
             <span>You need to log in</span>
                <form className="form" onSubmit={handleSubmit}>
                    <div className={"group"}>
                        <input
                            type="email"
                            placeholder="Your email"
                            name="email"
                            value={uuid.email}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className={"group"}>
                        <input
                            type="login"
                            placeholder="Your name"
                            name="login"
                            value={uuid.login}

                            autoComplete='off'
                            onChange={handleChange}

                            required
                        />
                    </div>
                    <div className={"group"}>
                        <input
                            type="avatar"
                            placeholder="Your avatar"
                            name="avatar"
                            value={uuid.avatar}

                            autoComplete='off'
                            onChange={handleChange}

                            required
                        />
                    </div>
                    <button className="profile__btn">
                        Update
                    </button>
                </form>

        </section>
    );
};

export default Profile;