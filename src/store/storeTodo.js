import { create } from "zustand";


// store todo
const useTodos = create((set,get) =>({
    todolist:[],
    checkEditTitle:false,
    checkChangeTodos:false,
    // property untuk show modal add todolist
    showModalAddTodoList:false,
    // method set change todos
    setChangeTodos:()=> set(state =>{
        return {checkChangeTodos:(!state.checkChangeTodos?true:false)}
    }),
    // method set data todolist
    setDataTodolist: (data)=>set(state => ({todolist:data})),
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
    // method open || close modal
    setModal:(action)=> set({showModalAddTodoList:action}),
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
    },
    // method post data todos
    postDataTodos:async (id_activity,value_todos,priority)=>{
        try{
            // data mentah
            let raw = {
                activity_group_id: id_activity,
                title: value_todos,
                priority
            };
            
            // configuration fetch
            let requestOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raw),
            };

            // post  data todos
            let xhr = await fetch("https://todo.api.devcode.gethired.id/todo-items", requestOptions)
            
            // close modal add data todolsit
            get().setModal(false)
            // aet check state
            get().setChangeTodos()
            
        }
        catch(e){
            return e
        }
    }
}))

export default useTodos