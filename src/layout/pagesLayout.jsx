import React,{useEffect} from 'react'


const PagesLayout = ({title,children}) =>{

    useEffect(()=>{
        document.title = title
    },[])
    
    return (
        <main className="main_template">
            {
                children
            }
        </main>
    )
}


export default PagesLayout;