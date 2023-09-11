import React from "react";

// import layout 
import PagesLayout from "../layout/pagesLayout";

// import icon
import {IoIosArrowForward} from 'react-icons/io'
import {TbPencil} from 'react-icons/tb'
import { BiPlus } from "react-icons/bi";

import { Link } from "react-router-dom";

const DetailPage = ()=>{
    return (
        <PagesLayout title="detailActivity" >
            <section className="max-w-[1020px] px-2 mx-auto mt-[2em] border-2 border-red-600">
                {/* header Detail Activty */}
                <header className="header_detail_activity">
                    {/* icon nav */}
                    <div className="flex-1 flex w-full border-2 border-red-600">
                        <Link to={'/'}>
                            <IoIosArrowForward className="self-center inline-block text-[2.8em] font-semibold  rotate-[-180deg]"/>
                        </Link>

                        {/* title activty */}
                        <div className="flex-1 w-full border-2 border-cyan-600">
                            <div className="flex  items-center border-2 border-red-600 h-full ">
                                <h2 className="title_activty pr-3 text-[1.8em] font-semibold cursor-pointer">
                                    New Activity
                                </h2>
                                <button className="py-1">
                                    <TbPencil className="text-[1.5em] text-slate-400 font-medium"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* action nav add todo */}
                    <div className="nav_item_add_todo  border-2 border-green-500">
                        <button className="relative flex items-center gap-[2px] h-[45px]  justify-center rounded-full w-auto px-3  transition-all duration-300 hover:opacity-[0.6] text-white bg-blue-navbar py-2.5 ">
                            <BiPlus className="text-[1.3em] font-bold" />
                            <p className="">Tambah</p>
                        </button>
                    </div>
                </header>
            </section>
        </PagesLayout>
    )
}

export default DetailPage;