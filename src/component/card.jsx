import React from "react";

// import store activity
import useStoreActivity from "../store/storeActivity";
import useTodos from "../store/storeTodo";

// import icon 
import { BiTrash } from "react-icons/bi";
import {TbTrash,TbPencil} from "react-icons/tb"
// import router
import { Link } from "react-router-dom";

// import utils
import parsingDate from "../utils/parsingDate";

// card activity
const CardActivity = ({activity})=>{

    // get data store
    let setModalActivity = useStoreActivity((state)=>state.setModalActivity)

    // open modal and get detail data
    const openModal = (event) =>{
        fetch(`https://todo.api.devcode.gethired.id/activity-groups/${activity.id}`).then(Response =>{
            if(!Response.ok){
                throw new Error('gagal mengambil data activity')
            }

            return Response.json()
        })
        .then(e =>{
            setModalActivity(true,e)
        })
        .catch(err =>{
           return err
        })
        .finally(()=>{
           return
        })
    }

    return (
        <div className="card_activity" >
            <Link to={`/detail/${activity.id}`} data-cy="activity-item" className="title_card_activity">
                <p data-cy="activity-item-title">{activity.title}</p>                
            </Link>
            <div className="footer_card_activity">
                <p data-cy="activity-item-date" className="date text-slate-500 text-[0.9em] flex-1 w-full">
                    {parsingDate(activity.created_at)}
                </p>
                <button onClick={openModal} data-cy="activity-item-delete-button" className="delete_activity z-[2]  text-slate-500 p-1 text-[1.1em] grid place-items-center">
                    <BiTrash/>
                </button>
            </div>
        </div>
    )
}

// card todo item
const CardTodoItem = ({title,priority,id_todo,is_active})=>{

    // USE TODOS
    let [setModalDeleteTodo,setChangeTodos,setModal] = useTodos(state => [state.setModalDeleteTodo,state.setChangeTodos,state.setModal])

    const openModalDeleteTodo = (event) =>{
        fetch(`https://todo.api.devcode.gethired.id/todo-items/${id_todo}`).then(Response =>{
            if(!Response.ok){
                throw new Error('gagal mengambil data todos')
            }

            return Response.json()
        })
        .then(data =>{
            setModalDeleteTodo(true,data)
        })
        .catch(err =>{
           return err
        })
        .finally(()=>{
           return
        })
    }

    const openModalUpdateTodo = (event)=>{
        fetch(`https://todo.api.devcode.gethired.id/todo-items/${id_todo}`).then(Response =>{
            if(!Response.ok){
                throw new Error('gagal mengambil data todos')
            }

            return Response.json()
        })
        .then(data =>{
            setModal(true,'Edit List Item',data)
        })
        .catch(err =>{
           return err
        })
        .finally(()=>{
           return
        })
    }

    // check status todo
    const checkTodo = (event)=>{
        // set data raw
        let raw = {
            is_active:(event.target.checked) ? 0 : 1
        };

        // set request option
        let requestOptions = {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw),
        redirect: 'follow'
        };

        // update checked todo
        fetch(`https://todo.api.devcode.gethired.id/todo-items/${id_todo}`, requestOptions)
        .then(response => response.status)
        .then(result => setChangeTodos())
        .catch(error => console.log('error', error))
    }

    return (
        <div className="card_todo_item">
            
            {/* check todo*/}
            <div className="flex gap-4 items-center">
            {/* input check todo */}
            <input type="checkbox" data-cy="todo-item-checkbox" defaultChecked={!is_active ? true : false} onClick={checkTodo} className="w-[20px] outline-none  h-[20px]" />
             
            {/* icon priority */}
            <div className={`icon_dropdown w-[12px] h-[12px] rounded-full ${priority}`}></div>
            </div>

            {/* title todo */}
            <h2 className={`font-medium truncate transition-all duration-75 ${!is_active && 'line-through text-slate-400'}`}>{title}</h2>

            {/* button edit todo */}
            <button onClick={openModalUpdateTodo} className="text-[1.4em] text-slate-400">
                <TbPencil/>
            </button>

            {/* BUTTON DELETE */}
            <div  className="flex-1 w-full flex justify-end items-center">
                    <button data-cy="todo-item-delete-button" onClick={openModalDeleteTodo} className="text-slate-400 grid place-items-center text-[1.4em]">
                        <TbTrash/>
                    </button>
            </div>
        </div>
    )
}

export {CardActivity,CardTodoItem}