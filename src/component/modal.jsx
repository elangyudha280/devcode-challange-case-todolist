import React from "react";

import { shallow } from "zustand/shallow";

// import store activity
import useStoreActivity from "../store/storeActivity";

// ImWarning
import { IoWarningOutline } from "react-icons/io5";
import {FiAlertCircle}from "react-icons/fi"


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


const ModalSuccessDelete = ({title})=>{
    return (
        <div data-cy="modal-information" className="card_modal flex flex-col items-center min-[300px]:items-stretch  min-[300px]:flex-row py-3 px-5 gap-2">
            <FiAlertCircle className="text-green-600 text-[1.5em] inline-block"/>
            <p className="msg_success font-medium text-center min-[300px]:text-start flex-1 w-full">{title}</p>
        </div>
    )
}

export {ModalDeleteActivity}