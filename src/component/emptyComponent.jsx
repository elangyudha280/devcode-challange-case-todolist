import React from "react";

// import images
import iconEmptyActivity from '../assets/images/activity-empty-state.png'

// component empty activity
const EmptyActivity = ()=>{
    return (
        <section className="empty_activity relative w-full flex justify-center pt-5">
                <img src={iconEmptyActivity} className="mx-auto w-[900px]  h-[400px] object-contain  inline-block" alt=""  />
        </section>
    )
}

export {EmptyActivity}