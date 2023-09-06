import React from "react";


import PagesLayout from "../layout/pagesLayout";

// import icons
import { BiPlus } from "react-icons/bi";

const HomePage=  () =>{
    return (
        <PagesLayout title='Homepage'>
            <div className="max-w-[1020px] px-2 mx-auto mt-[2em]">
                {/* header home page */}
                <header className="header_homepage flex flex-wrap justify-between items-center">
                    <h2 className="font-bold text-[1.8em]">
                        Activity
                    </h2>
                    <button className="btn_add_activity">
                            <BiPlus className="text-[1.3em] font-bold" />
                            <p className="">Tambah</p>
                    </button>
                </header>
                {/* body homepage */}
                <section className="body_homepage">
                    
                </section>
            </div>
        </PagesLayout>
    )
}

export default HomePage