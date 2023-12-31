import React, { useEffect, useState } from "react";

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

import { useParams } from "react-router-dom";


// utils
import dataDropdownPriority from "../utils/dataDropdownPrority";

// layout modal delete
const  LayoutModalDelete  = ({title,type,eventCloseModal,eventDeleteData})=>{
    return (
         <div data-cy="modal-delete" className="card_modal" onClick={(e)=>{e.stopPropagation()}}>
            <IoWarningOutline className="block mx-auto text-[5em] text-red-400"/>

            <h2 data-cy="modal-delete-title" className="text-center text-[0.9em] mt-5 font-medium">
            Apakah anda yakin menghapus {type}  "<span className="font-bold">{title}</span>"?
            </h2>

            <div className="flex justify-evenly mt-5 gap-x-5 gap-y-4">
                    <button data-cy="modal-delete-cancel-button" onClick={eventCloseModal} className="btn_batal w-full bg-slate-300 text-slate-500 font-semibold rounded-[2em] py-3 flex-1">
                        Batal
                    </button>
                    <button data-cy="modal-delete-confirm-button" onClick={eventDeleteData} className="btn_delete bg-red-600 text-white font-semibold rounded-[2em] py-3 w-full flex-1">
                        Hapus
                    </button>
            </div>
        </div>    
    )
}

// modal success delete activity
const LayoutModalSuccessDelete = ({title})=>{
    return (
        <div data-cy="modal-information" className="card_modal flex flex-col items-center min-[300px]:items-stretch  min-[300px]:flex-row py-3 px-5 gap-2">
            <FiAlertCircle data-cy="modal-information-icon" className="text-green-600 text-[1.5em] inline-block"/>
            <p data-cy="modal-information-title" className="msg_success font-medium text-center min-[300px]:text-start flex-1 w-full">{title}</p>
        </div>
    )
}

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
           <LayoutModalDelete title={modalActivity?.data?.title} type='Activity' eventCloseModal={closeModal} eventDeleteData={DeleteDataActiviy} />
            :
            <LayoutModalSuccessDelete title="activity berhasil di hapus"/>
          }
        </section>
    )
}



// model add todo list
const ModalAddTodoList = ({title,typeModal})=>{
    // id parameter activity
    const {id} = useParams()

    // use store todo
    let [setModal,postDataTodos,showModalAddTodoList,updateDataTodolist] = useTodos((state) => [state.setModal,state.postDataTodos,state.showModalAddTodoList,state.updateDataTodolist],shallow)

    // state input todo
    let [inputTodo,setInputTodo] = useState('')
    // state open dropdown
    let [openDropdown,setOpenDropdown] = useState(false)
    // current priority
    let [currentPriority,setCurrentPriority] = useState(null)

    useEffect(()=>{
        // check apakah sedang dalam mode edit todo

        if(title === 'Edit List Item'){
            // filter priosrity
            let findPriority = dataDropdownPriority.find(el =>{
                return el.priority === showModalAddTodoList?.idModal.priority
            })

            // set value input todo
            setInputTodo(showModalAddTodoList?.idModal.title)
            // set priority
            setCurrentPriority(findPriority)
        }
    },[])
  
    // event set priority
    const EventSetPriority = (priority,event)=>{
       setCurrentPriority(priority)
       setOpenDropdown(false)
    }

    // event post data
    const postTodos = (event)=>{
        event.preventDefault()

        if(inputTodo === ''){
            return
        }

        if(currentPriority === null){
            setCurrentPriority(dataDropdownPriority[0])
        }        
        // post data todos
        postDataTodos(id,inputTodo,currentPriority?.priority)

    }

    // event update todos
    const editUpdateTodo = (event)=>{
        event.preventDefault()
        if(inputTodo === ''){
            return
        }

        if(currentPriority === null){
            setCurrentPriority(dataDropdownPriority[0])
        }  

        updateDataTodolist(showModalAddTodoList?.idModal.id,inputTodo,currentPriority?.priority)
    }
    return (
        <section onClick={setModal.bind(this,false,'',null)} className="modal_container overflow-y-auto overflow-x-hidden pb-[5em]">

                {/* card modal  */}
                <div onClick={(e)=>{e.stopPropagation()}} className="card_modal_todolist" data-cy="modal-add">
                    {/* header modal */}
                    <div className="header_modal_todolist relative flex items-center w-full p-4 border-b-[1px] " >
                        <p className="font-medium flex-1 w-full text-[1.2em] text-slate-950" data-cy="modal-add-title">{title}</p>
                        <button onClick={setModal.bind(this,false,'',null)} type="button" className="p-1 text-[1.5em] h-full" data-cy="modal-add-close-button"> 
                            <GrFormClose/>
                        </button>
                    </div>

                    {/* body modal */}
                    <form action="" onSubmit={(title === 'Edit List Item' ? editUpdateTodo : postTodos)}>
                        <div className="body_modal relative w-full" >
                                {/* modal input data*/}
                                <div className="w-full py-5 px-4 border-b-[1px] " onClick={(e)=>{e.stopPropagation()}}>
                                    {/* input todolist */}
                                    <div className="input-group">
                                        <label htmlFor="input_todo"  data-cy="modal-add-name-title"  className="inline-block w-full font-semibold text-[0.8em]">Nama ListItem</label>
                                    <input onChange={(e)=>{setInputTodo(e.target.value)}} defaultValue={inputTodo} data-cy="modal-add-name-input" required type="text" autoFocus placeholder="Tambahkan Nama List Item" className="w-full py-3 rounded-md px-3 border-2 placeholder:text-slate-400 outline-none text-black transition-all duration-100 focus:border-blue-500  " />
                                    </div>

                                    {/* input priority */}
                                    <div className="input-group mt-3" >
                                        <label htmlFor="input_todo" data-cy="modal-add-priority-title" className="inline-block w-full font-semibold text-[0.8em]">Priority</label>

                                        {/* // dropdown current */}
                                        <div className=" relative rounded-md w-[160px] z-[4]">
                                            <button type="button" data-cy="modal-add-priority-dropdown" onClick={()=>{
                                                setOpenDropdown((!openDropdown ? true : false))
                                            }
                                                } 
                                                className="dropdown_current">
                                                {
                                                    currentPriority === null ?
                                                    (
                                                        <>
                                                        <p className=" text-[0.9em] flex-1 w-full text-left" data-cy="modal-add-priority-item">Pilih Priority</p>
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
                                                            <button key={el.id} data-cy="modal-add-priority-item" onClick={EventSetPriority.bind(this,el)} type="button"  className={`
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
                                <div  className="flex w-full py-5 justify-end items-center px-4">
                                    <button  type="submit" data-cy="modal-add-save-button" disabled={
                                        (inputTodo === '') ? true : false
                                         } className={`btn_sumbit_todo px-6 py-3 bg-blue-navbar rounded-full text-white
                                         ${(inputTodo === '') && 'opacity-[0.7]' }
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

// MODAL DELETE TODOLIST 
const ModalDeleteTodoList = ()=>{
    let [modalDeleteTodo,setModalDeleteTodo,setChangeTodos] = useTodos(state => [state.modalDeleteTodo,state.setModalDeleteTodo,state.setChangeTodos],shallow)

    // delete todos
     // delete data
     const DeleteDataActiviy = ()=>{
        fetch(`https://todo.api.devcode.gethired.id/todo-items/${modalDeleteTodo?.data?.id}`,{
            method:'delete'
        }).then(Response =>{
            if(!Response.ok){
                throw new Error('gagal menghapus data activity')
            }

            return Response.json()
        })
        .then(e =>{
            setModalDeleteTodo(true,[],true)
            setChangeTodos()
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
        setModalDeleteTodo(false,[],false)
    }
    return (
        <section className="modal_container"   onClick={closeModal}>
            {
            !modalDeleteTodo?.successCondition ?
            <LayoutModalDelete title={modalDeleteTodo?.data.title} type='todo' eventCloseModal={closeModal} eventDeleteData={DeleteDataActiviy} />
            :
            <LayoutModalSuccessDelete title="activity berhasil di hapus"/>
            }
        </section>
    )
}



export {ModalDeleteActivity,ModalAddTodoList,ModalDeleteTodoList}