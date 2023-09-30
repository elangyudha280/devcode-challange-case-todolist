import { create } from "zustand";


// store todo
const useTodos = create((set,get) =>({
    todolist:[],
    modalDeleteTodo:{
        condition:false,
        data:[],
        successCondition:false
    },
    checkEditTitle:false,
    checkChangeTodos:false,
    // property untuk show modal add todolist
    showModalAddTodoList:{
        condition:false,
        typeModal:'',
        IDmodal:''
    },
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
    // method sorting todo item
    sortingTodo: (type) =>{

        let dataTodo = get().todolist;
        // sorting
        switch (type) {
            // SORTING DATA TERBARU
            case 'terbaru':
                let sortingTerbaru = dataTodo.sort((a,b)=>{
                            return b.id - a.id
                        }) 
                get().setDataTodolist(sortingTerbaru)
                return  
            // SORTING DATA TERLAMA YG DIBUAT 
            case 'terlama':
                let sortingTerlama = dataTodo.sort((a,b)=>{
                            return a.id - b.id
                        }) 
                        get().setDataTodolist(sortingTerlama)
                return 
            // SORTING DATA DARI ABJAD A-Z
            case 'A-Z':
                let sortingAZ = dataTodo.sort((a,b)=>{
                            const titleA = a.title.toLowerCase();
                            const titleB = b.title.toLowerCase(); 
                          if (titleA > titleB) {
                              return 1;
                          }
                          return 0
                      }) 
                        get().setDataTodolist(sortingAZ)
                return
            // SORTING DATA DARI ABJAD Z-A
            case 'Z-A':
                let sortingZA = dataTodo.sort((a,b)=>{
                                  const titleA = a.title.toLowerCase(); 
                                 const titleB = b.title.toLowerCase(); 
                                if (titleA < titleB) {
                                    return 1;
                                }
                                return
                            }) 
                            get().setDataTodolist(sortingZA)
                return
            // SORTING TODO BELUM SELESAI
            default:
                    let sortingBelumSelesai = dataTodo.sort((a,b)=>{
                        return   b.is_active - a.is_active
                      }) 
                     get().setDataTodolist(sortingBelumSelesai)
                break;
        }
    },
    // method unutk close mode edit
    setDataEditTitle:()=>{
        set(state=>{
            return {checkEditTitle:false}
        })
    },
    // method open || close modal
    setModal:(action,typeModal,idModal)=> set({showModalAddTodoList:{
        condition:action,
        typeModal:typeModal,
        idModal
    }}),
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
            get().setModal(false,'',null)
            // aet check state
            get().setChangeTodos()
            
        }
        catch(e){
            return e
        }
    },
    // update todolist
    updateDataTodolist: async (id_activity,value_todos,priority)=>{
        try{
            let raw = {
                title: value_todos,
                priority:priority,
            };
    
            let requestOptions = {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raw),
            redirect: 'follow'
            };
    
            let xhr = await  fetch(`https://todo.api.devcode.gethired.id/todo-items/${id_activity}`, requestOptions)
         
              // close modal add data todolsit
              get().setModal(false,'',null)
              // aet check state
              get().setChangeTodos()
          
        }
        catch(e){
                return e
        }
    },
    setModalDeleteTodo(condition,data,successCondition){
        set((state)=>{
            return {modalDeleteTodo:{condition,data,successCondition}}
        })
    }
}))

export default useTodos