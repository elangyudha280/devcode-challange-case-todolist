import React from "react";

// import store activity
import useStoreActivity from "../store/storeActivity";


// import icon 
import { BiTrash } from "react-icons/bi";

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
           return e
        })
        .finally(()=>{
           return
        })
    }

    return (
        <div className="card_activity " >
            <Link to={`/detail/${activity.id}`} data-cy="activity-item" className="title_card_activity">
               {activity.title}
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
const CardTodoItem = ()=>{
    return 
}

export {CardActivity,CardTodoItem}