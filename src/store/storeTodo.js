import { create } from "zustand";


// store todo
const useTodos = create((set) =>({
    checkEditTitle:false,
    // method mode edit
    setEditTitle: ()=>{
        set(state =>{
            return {checkEditTitle:true}
        })
    },
    // method unutk close mode edit
    setDataEditTitle:()=>{
        set(state=>{
            return {checkEditTitle:false}
        })
    },
    // method untuk edit detail activity
    setTitleActivity: async (titleActivity,id)=>{
        try{
        let requestOptions = {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title:titleActivity
                }),
                redirect: 'follow'
        };

        let xhr = await  fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`,requestOptions)
    
        }
        catch(e){
            console.log(e)
        }
    }
}))

export default useTodos