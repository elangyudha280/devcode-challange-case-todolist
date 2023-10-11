import React from "react";



const Navbar = ()=>{
    return (
        <nav className="main_navbar">
            <div data-cy="header-background" className="container_nav max-w-[1000px] flex items-center h-[60px] mx-auto">
                <h1 data-cy="header-title" className="text-white font-bold text-[1.5em] uppercase">to do list app</h1>
            </div>
        </nav>
    )
}
export default Navbar