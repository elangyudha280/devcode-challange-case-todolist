import React from "react";

// import layout 
import PagesLayout from "../layout/pagesLayout";

// import store
import useTodos from "../store/storeTodo";
import shallow from 'zustand/shallow'

// import icon
import {IoIosArrowForward} from 'react-icons/io'
import {TbPencil} from 'react-icons/tb'
import { BiPlus } from "react-icons/bi";
import tableArrowsSort from '../assets/images/tabler_arrows-sort.svg'

import { Link } from "react-router-dom";

const DetailPage = ()=>{

    // import store
    const  [checkEditTitle,setEditTitle,setDataEditTitle] = useTodos((state)=>[state.checkEditTitle,state.setEditTitle,state.setDataEditTitle])
    return (
        <PagesLayout title="detailActivity" page="detail">
            <section className="max-w-[1020px] px-2 mx-auto mt-[2em]"  onClick={()=>{console.log('oke')}}>
                {/* header Detail Activty */}
                <header className="header_detail_activity">
                    {/* icon nav */}
                    <div className="flex-1 flex w-full border-b-[1px] border-b-slate-200 py-2 md:border-0 md:py-0">
                        <Link to={'/'} className="self-center">
                            <IoIosArrowForward className=" inline-block text-[2em]  font-semibold  rotate-[-180deg] md:text-[2.8em]"/>
                        </Link>

                        {/* title activty */}
                        <div className="flex-1 w-full ">
                            <div className="flex  items-center  h-full ">
                                {/* title detail activity */}
                                <h2 className="title_activty pr-3 flex-1  text-[1.4em]  font-semibold cursor-pointer md:text-[1.5em] md:flex-initial">
                                    New Activity
                                </h2>
                                {/* input change detail activity */}
                                {/* <input type="text" className=" flex-1 w-full py-1 bg-transparent text-semibold outline-none border-b-[1px] border-b-slate-200 text-[1.3em] md:text-[1.5em]" /> */}
                                <button className="py-1">
                                    <TbPencil className="text-[1.5em] text-slate-400 font-medium"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* action nav add todo */}
                    <div className="nav_item_add_todo">
                        {/* button devide sort todo */}
                        <button className="btn_sort_todo h-[40px] w-[40px] rounded-full bg-slate-100 border-[1px] border-slate-300 grid place-items-center md:h-[45px] md:w-[45px]" >
                            <img src={tableArrowsSort} className="object-center " alt="" />
                        </button>

                        {/* button add todo */}
                        <button className="relative flex items-center gap-[2px] h-[40px]  justify-center rounded-full w-auto px-3  transition-all duration-300 hover:opacity-[0.6] text-white bg-blue-navbar py-2.5 md:h-[45px]">
                            <BiPlus className="text-[0.9em] md:text-[1em] font-bold" />
                            <p className="text-[0.9em] md:text-[1em] font-semibold">Tambah</p>
                        </button>
                    </div>
                </header>
            </section>
        </PagesLayout>
    )
}

export default DetailPage;