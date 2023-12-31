import React from "react";

// import images
import iconEmptyActivity from '../assets/images/activity-empty-state.png'
import  emptyTodoImg from '../assets/images/todo-empty-state.svg'

// import function post data activity
// import addDataActivity from "../utils/activity";

// import store   
import useStoreActivity from "../store/storeActivity";
import useTodos from "../store/storeTodo";
// component empty activity
const EmptyActivity = ()=>{
    let  setCheckDataChange = useStoreActivity((state)=> state.setCheckDataChange)

    const addData = ()=>{
        fetch('https://todo.api.devcode.gethired.id/activity-groups?email=elangyudharakasiwi@gmail.com',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title: 'new Activity',
                email:'elangyudharakasiwi@gmail.com'
            })
        })
        .then(response =>{
            if(!response.ok){
                throw new Error('gagal post data')
            }
            return response.status
        })
        .then(status =>{
            setCheckDataChange()
            return status
        })
        .catch(e => e)
    }

    return (
        <section onClick={addData} data-cy="activity-empty-state" className="empty_activity cursor-pointer relative w-full flex justify-center pt-5">
                <img src={iconEmptyActivity} className="mx-auto w-[900px]  h-[400px] object-contain  inline-block" alt=""  />
        </section>
    )
}

// empty todo
const EmptyTodo = ()=>{

    // useStore
    const setModal = useTodos((state)=> state.setModal)

    return (
        <section onClick={setModal.bind(this,true)} data-cy="todo-empty-state" className="todo_empty_state  mt-3 cursor-pointer relative w-full flex justify-center pt-5">
            <img src={emptyTodoImg} className="mx-auto w-[900px]  h-[400px] object-contain  inline-block" alt="empty_todo_img"  />
        </section>
    )
}

export {EmptyActivity,EmptyTodo}