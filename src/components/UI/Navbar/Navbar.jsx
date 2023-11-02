import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <div className="navbar__links">
                <Link className='navbar__link' to="/about">About us</Link>
                <Link className='navbar__link' to="/posts">Posts</Link>
            </div>
            <MyButton onClick={logout}>
                Logout
            </MyButton>
        </div>
    );
};

export default Navbar;