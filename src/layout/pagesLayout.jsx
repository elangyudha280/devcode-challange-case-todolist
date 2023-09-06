import React,{useEffect} from 'react'

// import navbar
import Navbar from '../component/navbar'

const PagesLayout = ({title,children}) =>{

    useEffect(()=>{
        document.title = title
    },[])
    
    return (
        <main className="main_template">
            {/* navbar */}
            <Navbar/>
            {
                children
            }
        </main>
    )
}


export default PagesLayout;