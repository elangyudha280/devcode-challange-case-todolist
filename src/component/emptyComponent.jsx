import React from "react";

// import images
import iconEmptyActivity from '../assets/images/activity-empty-state.png'

// import function post data activity
import addDataActivity from "../store/activity";


// component empty activity
const EmptyActivity = ()=>{

    return (
        <section onClick={addDataActivity.bind(this,'gagal menambahkan data activity')}  className="empty_activity cursor-pointer relative w-full flex justify-center pt-5">
                <img src={iconEmptyActivity} className="mx-auto w-[900px]  h-[400px] object-contain  inline-block" alt=""  />
        </section>
    )
}

export {EmptyActivity}