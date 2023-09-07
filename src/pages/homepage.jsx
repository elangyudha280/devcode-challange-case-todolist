import React, { useEffect } from "react";

import {shallow} from 'zustand/shallow'

import PagesLayout from "../layout/pagesLayout";

// import component 
import { CardActivity } from "../component/card";
import { EmptyActivity } from "../component/emptyComponent";
// import icons
import { BiPlus } from "react-icons/bi";

// import store
import useStoreActivity from "../store/storeActivity";

const HomePage=  () =>{

    // data activity
    let [dataActivity,setDataActivity,checkDataChange,setCheckDataChange]  = useStoreActivity((state)=> [state.dataActivity,state.setDataActivity,state.checkDataChange,state.setCheckDataChange],shallow)
 


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
            console.log('loading selesai')
        })
    },[checkDataChange])

    return (
        <PagesLayout title='Homepage'>
            <div className="max-w-[1020px] px-2 mx-auto mt-[2em]">
                {/* header home page */}
                <header className="header_homepage flex flex-wrap justify-between items-center">
                    <h2 className="font-bold text-[1.8em]">
                        Activity
                    </h2>
                    <button onClick={setCheckDataChange} className="btn_add_activity">
                            <BiPlus className="text-[1.3em] font-bold" />
                            <p className="">Tambah</p>
                    </button>
                </header>
                {/* body homepage */}
                {
              
                (dataActivity?.length < 1) ? <EmptyActivity/>
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