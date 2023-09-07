import { create } from "zustand";

// import {createWithEqualityFn} from 'zustand/traditional'


const useStoreActivity =create( (set) =>({
    dataActivity:[],
    checkDataChange:false,
    setDataActivity(data){
        set(state => ({dataActivity:data}))
    },
    setCheckDataChange(){
        set((state) => {
         return  {checkDataChange:(state.checkDataChange === false ? true : false)} 
        })
    }
}))

export default useStoreActivity;