import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export const Header = () => {
    const { userInfo } = useAppContext();
    const { pathname } = useLocation();
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header-wrap">
                        <div className="logo">
                            <Link to='/'>
                                <img src="/assets/images/logo.png" alt="" style={{
                                    height: '35px',
                                    width: '35px',
                                }} />
                            </Link>
                        </div>
                        <div className="title-info">
                            <strong>Employee Table Test App</strong>
                        </div>
                        <div className="title-info">
                            <strong>{userInfo.fullName && pathname.startsWith('/employee-form/edit') ? userInfo.fullName : ''}</strong>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}