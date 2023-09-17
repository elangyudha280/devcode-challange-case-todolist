import React, { useState } from "react";

import { shallow } from "zustand/shallow";

// import store activity
import useStoreActivity from "../store/storeActivity";
import useTodos from "../store/storeTodo";
// ImWarning
import { IoWarningOutline } from "react-icons/io5";
import {FiAlertCircle}from "react-icons/fi"
import {GrFormClose} from "react-icons/gr"
import {RiArrowDropDownLine} from "react-icons/ri"
import IconCheck from '../assets/images/icon_sort_active.svg'


// utils
import dataDropdownPriority from "../utils/dataDropdownPrority";

// modal delete activity
const ModalDeleteActivity = ()=>{

    let [modalActivity,setModalActivity,setCheckDataChange] = useStoreActivity((state) => [state.modalActivity,state.setModalActivity,state.setCheckDataChange],shallow)

    // delete data
    const DeleteDataActiviy = ()=>{
        fetch(`https://todo.api.devcode.gethired.id/activity-groups/${modalActivity?.data?.id}`,{
            method:'delete'
        }).then(Response =>{
            if(!Response.ok){
                throw new Error('gagal menghapus data activity')
            }

            return Response.json()
        })
        .then(e =>{
            setModalActivity(true,[],true)
            setCheckDataChange()
        })
        .catch(err =>{
            return err
        })
        .finally(()=>{
            return
        })
    }

    // closeModal
    const closeModal = ()=>{
        setModalActivity(false,[],false)
    }

    return (
        <section className="modal_container"   onClick={closeModal}>
          {
            !modalActivity?.successCondition ?
             <div data-cy="modal-delete" className="card_modal" onClick={(e)=>{e.stopPropagation()}}>
                <IoWarningOutline className="block mx-auto text-[5em] text-red-400"/>

                <h2 data-cy="modal-delete-title" className="text-center text-[0.9em] mt-5 font-medium">
                Apakah anda yakin menghapus Activity  "<span className="font-bold">{modalActivity?.data?.title}</span>"?
                </h2>

                <div className="flex justify-evenly mt-5 gap-x-5 gap-y-4">
                        <button data-cy="modal-delete-cancel-button" onClick={closeModal} className="btn_batal w-full bg-slate-300 text-slate-500 font-semibold rounded-[2em] py-3 flex-1">
                            Batal
                        </button>
                        <button data-cy="modal-delete-confirm-button" onClick={DeleteDataActiviy} className="btn_delete bg-red-600 text-white font-semibold rounded-[2em] py-3 w-full flex-1">
                            Hapus
                        </button>
                </div>
            </div> 
            :
            <ModalSuccessDelete title="activity berhasil di hapus"/>
          }
        </section>
    )
}

// modal success delete activity
const ModalSuccessDelete = ({title})=>{
    return (
        <div data-cy="modal-information" className="card_modal flex flex-col items-center min-[300px]:items-stretch  min-[300px]:flex-row py-3 px-5 gap-2">
            <FiAlertCircle className="text-green-600 text-[1.5em] inline-block"/>
            <p className="msg_success font-medium text-center min-[300px]:text-start flex-1 w-full">{title}</p>
        </div>
    )
}

// model add todo list
const ModalAddTodoList = ()=>{

    // use store todo
    let setModal = useTodos((state) => state.setModal)

    // state input todo
    let [inputTodo,setInputTodo] = useState('')
    // state open dropdown
    let [openDropdown,setOpenDropdown] = useState(false)
    // current priority
    let [currentPriority,setCurrentPriority] = useState(null)

  
    // event set priority
    const EventSetPriority = (priority,event)=>{
       setCurrentPriority(priority)
       setOpenDropdown(false)
    }

    return (
        <section onClick={setModal.bind(this,false)} className="modal_container overflow-y-auto overflow-x-hidden pb-[5em]">

                {/* card modal  */}
                <div onClick={(e)=>{e.stopPropagation()}} className="card_modal_todolist  ">
                    {/* header modal */}
                    <div className="header_modal_todolist relative flex items-center w-full p-4 border-b-[1px] " >
                        <p className="font-medium flex-1 w-full text-[1.2em] text-slate-950">Tambah List Item</p>
                        <button onClick={setModal.bind(this,false)} className="p-1 text-[1.5em] h-full"> 
                            <GrFormClose/>
                        </button>
                    </div>

                    {/* body modal */}
                    <form action="">
                        <div className="body_modal relative w-full  ">
                                {/* modal input data*/}
                                <div className="w-full py-5 px-4 border-b-[1px] ">
                                    {/* input todolist */}
                                    <div className="input-group">
                                        <label htmlFor="input_todo" className="inline-block w-full font-semibold text-[0.8em]">Nama ListItem</label>
                                    <input onChange={(e)=>{setInputTodo(e.target.value)}} type="text" autoFocus placeholder="Tambahkan Nama List Item" className="w-full py-3 rounded-md px-3 border-2 text-slate-400 outline-none focus:text-black transition-all duration-100 focus:border-blue-500" />
                                    </div>

                                    {/* input priority */}
                                    <div className="input-group mt-3">
                                        <label htmlFor="input_todo" className="inline-block w-full font-semibold text-[0.8em]">Priority</label>

                                        {/* // dropdown current */}
                                        <div className=" relative rounded-md w-[160px] z-[4]">
                                            <button type="button" onClick={()=>{
                                                setOpenDropdown((!openDropdown ? true : false))
                                            }
                                                } 
                                                className="dropdown_current">
                                                {
                                                    currentPriority === null ?
                                                    (
                                                        <>
                                                        <p className=" text-[0.9em] flex-1 w-full text-left">Pilih Priority</p>
                                                        <RiArrowDropDownLine className="text-[1.5em] transition-all duration-100"/>
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                        <div className={`icon_dropdown w-[10px] h-[10px] ${currentPriority?.priority} rounded-full`}></div>
                                                            <p className=" text-[0.9em] flex-1 w-full text-left">{currentPriority?.title}</p>
                                                        <RiArrowDropDownLine className="text-[1.5em] transition-all duration-100"/>
                                                        </>
                                                    )
                                                }
                                            </button>
                                            <div className={`
                                                dropdown_devide
                                                overflow-hidden
                                                 ${!openDropdown ? 'h-[0px] border-[0px]' : 'h-auto border-[1px]'}
                                              `}>
                                              {
                                                    dataDropdownPriority?.map(el =>{
                                                        return (
                                                            <button key={el.id} onClick={EventSetPriority.bind(this,el)} type="button"  className={`
                                                            dropdown_item
                                                            ${(el.id === currentPriority?.id) && 'bg-blue-navbar  text-white'}
                                                            `}>
                                                                <div className={`icon_dropdown w-[10px] h-[10px] rounded-full ${el.priority}`}></div>
                                                                <p className=" text-[0.9em] flex-1 w-full text-left capitalize">{el.title}</p>
                                                                {(el.id === currentPriority?.id) &&<img src={IconCheck} alt="" className="object-center" />}  
                                                            </button>
                                                        )
                                                    })
                                              } 
                                            </div>
                                        </div>
                                
                                    </div>
                                </div>

                                {/* modal submit data */}
                                <div className="flex w-full py-5 justify-end items-center px-4">
                                    <button type="submit" disabled={
                                        (inputTodo === '' || currentPriority === null) ? true : false
                                         } className={`btn_sumbit_todo px-6 py-3 bg-blue-navbar rounded-full text-white
                                         ${(inputTodo === '' || currentPriority === null) && 'opacity-[0.7]' }
                                         `}>
                                        Submit
                                    </button>
                                </div>
                        </div>
                    </form>
                </div>
        </section>
    )
}



export {ModalDeleteActivity,ModalAddTodoList}