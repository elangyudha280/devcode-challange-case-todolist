import React from "react";

// import component 

import { BiTrash } from "react-icons/bi";

// card activity
const CardActivity = ()=>{
    return (
        <div className="card_activity " >
            <h2 className="title_card_activity">
                new activity 
            </h2>
            <div className="footer_card_activity">
                <p className="date text-slate-500 text-[0.9em] flex-1 w-full">
                    5 oktober 2022
                </p>
                <button className="delete_activity text-slate-500 p-1 text-[1.1em] grid place-items-center">
                    <BiTrash/>
                </button>
            </div>
    </div>
    )
}

export {CardActivity}