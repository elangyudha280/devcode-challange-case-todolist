import { create } from "zustand";


// store todo
const useTodos = create((set) =>({
    checkEditTitle:false,
    setEditTitle: ()=>{
        set(state =>{
            return {checkEditTitle:true}
        })
    },
    setDataEditTitle:()=>{
        set(state=>{
            return {checkEditTitle:false}
        })
    }
}))

export default useTodos