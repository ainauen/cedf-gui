import React from "react";
import { Outlet } from "react-router-dom";
import AppNavBar from "./NavBar";

const Layout =()=>{
    return(
        <>
            <AppNavBar/>
            <div className="p-3">
                <Outlet/>
            </div>
        </>
    )
};

export default Layout;