import React, { useEffect,useState } from "react";

import {shallow} from 'zustand/shallow'

import PagesLayout from "../layout/pagesLayout";

// import component 
import { CardActivity } from "../component/card";
import { EmptyActivity } from "../component/emptyComponent";
import { ModalDeleteActivity } from "../component/modal";

// import utils 
import addDataActivity from "../utils/activity";

// import icons
import { BiPlus } from "react-icons/bi";

// import store
import useStoreActivity from "../store/storeActivity";
import useTodos from "../store/storeTodo";

const HomePage =  () =>{

    // data activity
    let [dataActivity,setDataActivity,checkDataChange,setCheckDataChange,modalActivity]  = useStoreActivity((state)=> [state.dataActivity,state.setDataActivity,state.checkDataChange,state.setCheckDataChange,state.modalActivity])
 
    // STORE TODO
    let [setDataTodolist,setModalDeleteTodo,setModal] = useTodos(state => [state.setDataTodolist,state.setModalDeleteTodo,state.setModal],shallow)

    useEffect(()=>{
        // RESET DTA TODO LIST
        setDataTodolist([])
        setModalDeleteTodo(false,[],false)
        setModal(false)
    },[])

    useEffect(()=>{
        fetch('https://todo.api.devcode.gethired.id/activity-groups?email=elangyudharakasiwi@gmail.com').then(Response =>{
            if(!Response.ok){
                throw new Error('gagal mengambil data activity')
            }
            return Response.json()
        })
        .then(e =>{
            setDataActivity(e.data)
        })
        .catch(err =>{
            console.log(err)
        })
        .finally(()=>{
            return
        })
    },[checkDataChange])

    // add data activity
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
        <PagesLayout title='Homepage'>
            {/* modal delete Activty */}
            {
                (modalActivity.condition) &&  <ModalDeleteActivity/>
            }
            <div className="max-w-[1020px] px-2 mx-auto mt-[2em]">
                {/* header home page */}
                <header className="header_homepage flex flex-wrap justify-between items-center">
                    <h2 className="font-bold teact-white text-[1.5em]" data-cy="activity-title">
                        Activity
                    </h2>
                    <button onClick={addData} data-cy="activity-add-button" className="btn_add_activity">
                            <BiPlus className="text-[1.3em] font-bold" />
                            <p className="">Tambah</p>
                    </button>
                </header>
                {/* body homepage */}
                {
              
                (dataActivity?.length === 0) ? <EmptyActivity/>
                :
                    <section className="body_homepage">
                        {
                            dataActivity?.map(el=>{
                                return (
                                    <CardActivity key={el.id} activity={el}/>
                                )
                            })
                        }
                    </section>
                }
              
            </div>
        </PagesLayout>
    )
}

export default HomePage