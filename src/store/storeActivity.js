import { create } from "zustand";

// import {createWithEqualityFn} from 'zustand/traditional'


const useStoreActivity =create( (set) =>({
    dataActivity:[],
    checkDataChange:false,
    modalActivity:{
        condition:false,
        data:[],
        successCondition:false
    },
    setDataActivity(data){
        set(state => ({dataActivity:data}))
    },
    setCheckDataChange(){
        set((state) => {
         return  {checkDataChange:(state.checkDataChange === false ? true : false)} 
        })
    },
    setModalActivity(condition,data,successCondition){
        set((state)=>{
            return {modalActivity:{condition,data,successCondition}}
        })
    }
    
}))

export default useStoreActivity;