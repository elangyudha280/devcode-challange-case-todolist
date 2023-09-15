import React,{useEffect} from 'react'

// import navbar
import Navbar from '../component/navbar'

const PagesLayout = ({title,page,onClick,children}) =>{

    useEffect(()=>{
        document.title = title
    },[])
    
    return (
        <>
            {
                page === 'detail' ? 
                <main className="main_template" onClick={onClick}>
                    {/* navbar */}
                    <Navbar/>
                    {
                        children
                    }
                </main>
                :
                <main className="main_template">
                    {/* navbar */}
                    <Navbar/>
                    {
                        children
                    }
                </main>
            }
        </>
    )
}


export default PagesLayout;