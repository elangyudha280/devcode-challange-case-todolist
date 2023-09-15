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
    },
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