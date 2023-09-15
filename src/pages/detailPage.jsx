import React,{useEffect, useState} from "react";

// import layout 
import PagesLayout from "../layout/pagesLayout";

// import store
import useTodos from "../store/storeTodo";
import {shallow} from 'zustand/shallow'

// import icon
import {IoIosArrowForward} from 'react-icons/io'
import {TbPencil} from 'react-icons/tb'
import { BiPlus } from "react-icons/bi";
import tableArrowsSort from '../assets/images/tabler_arrows-sort.svg'

import { Link,useParams } from "react-router-dom";

const DetailPage = ()=>{

    // GET PARAMS
    const {id} = useParams()

    // import store
    const  [checkEditTitle,setEditTitle,setDataEditTitle,setStoreTitleActivity] = useTodos((state)=>[state.checkEditTitle,state.setEditTitle,state.setDataEditTitle,state.setTitleActivity],shallow)
   
    // state TITLE activity
    const [titleActivity,setTitleActivity] = useState('')



    // get data detail actiivty
    useEffect(()=>{
        // let raw = {
        //     title:titleActivity
        // }
        // let requestOptions = {
        // method: 'PATCH',
        // headers:{
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(raw),
        // redirect: 'follow'
        // };

        fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        .then(response => {
            if(!response.ok){
                throw new Error('gagal mengambil data')
            }
            return response.json()
        })
        .then(result => setTitleActivity(result.title))
        .catch(error => '')
    },[])

    // close mode edit title
    const closeModeEdit = () =>{
        // jika sedang berada di mode edit maka set data detail activity
        if(checkEditTitle){
            setDataEditTitle()
            setStoreTitleActivity(titleActivity,id)
        return
        }
        return
    }

    // event mode edit
    const modeEdit = (event)=>{
        event.stopPropagation()
        // jika sedang berada di mode edit maka ketika close ngirim data
        if(checkEditTitle){
            setDataEditTitle()
            // tutup mode edit
            closeModeEdit()
            return 
        }        
        
        // set mode edit title
        setEditTitle()
    }

    // set title 
    let setTitle = (e)=>{
        if(e.target.value.length < 1){
            setTitleActivity('New Activity')
            return
        }
        setTitleActivity(e.target.value)
    }

    return (
        <PagesLayout title="detailActivity" page="detail" onClick={closeModeEdit}>
            <section className="max-w-[1020px] px-2 mx-auto mt-[2em]"  >
                {/* header Detail Activty */}
                <header className="header_detail_activity">
                    {/* icon nav */}
                    <div className="flex-1 flex w-full border-b-[1px] border-b-slate-200 py-2 md:border-0 md:py-0">
                        {/* nav to home */}
                        <Link to={'/'} data-cy="todo-back-button" className="self-center">
                            <IoIosArrowForward className=" inline-block text-[2em]  font-semibold  rotate-[-180deg] md:text-[2.8em]"/>
                        </Link>

                        {/* title activty */}
                        <div className="flex-1 w-full ">
                            <div className="flex  items-center  h-full ">
                                {
                                    (checkEditTitle) ? 
                                   (
                                    // input edit title activity
                                     <input type="text" onChange={setTitle} defaultValue={titleActivity} autoFocus={true} className=" flex-1 w-full  bg-transparent font-semibold outline-none text-[1.3em] md:border-b-[1px] md:border-b-slate-200  md:text-[1.5em]" />
                                    )
                                    :
                                    (
                                        // current title activity
                                        <h2 onClick={modeEdit} data-cy="todo-title" className="title_activty pr-3 flex-1   text-[1.4em]  font-semibold cursor-pointer md:text-[1.5em] md:flex-initial">
                                            {titleActivity}
                                        </h2>
                                    )
                                }
                                {/* edit title activity */}
                                <button className="py-1 " data-cy="todo-title-edit-button" onClick={modeEdit}>
                                    <TbPencil className="text-[1.5em] text-slate-400 font-medium"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* action nav add todo */}
                    <div className="nav_item_add_todo">
                        {/* button devide sort todo */}
                        <button data-cy="todo-sort-button" className="btn_sort_todo h-[40px] w-[40px] rounded-full bg-slate-100 border-[1px] border-slate-300 grid place-items-center md:h-[45px] md:w-[45px]" >
                            <img src={tableArrowsSort} className="object-center " alt="" />
                        </button>

                        {/* button add todo */}
                        <button data-cy="todo-add-button" className="relative flex items-center gap-[2px] h-[40px]  justify-center rounded-full w-auto px-3  transition-all duration-300 hover:opacity-[0.6] text-white bg-blue-navbar py-2.5 md:h-[45px]">
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