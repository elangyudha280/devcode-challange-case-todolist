import React from "react";

// import icon 
import { BiTrash } from "react-icons/bi";

// import router
import { Link } from "react-router-dom";

// import utils
import parsingDate from "../utils/parsingDate";

// card activity
const CardActivity = ({activity})=>{

    // event open modal delete
    const openModal = ()=>{
        return
    }
    return (
        <Link to={`/detail/${activity.id}`} className="card_activity " >
            <h2 className="title_card_activity">
               {activity.title}
            </h2>
            <div className="footer_card_activity">
                <p className="date text-slate-500 text-[0.9em] flex-1 w-full">
                    {parsingDate(activity.created_at)}
                </p>
                <button data-delete={activity.id} className="delete_activity text-slate-500 p-1 text-[1.1em] grid place-items-center">
                    <BiTrash/>
                </button>
            </div>
        </Link>
    )
}

export {CardActivity}