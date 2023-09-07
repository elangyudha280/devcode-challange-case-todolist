



const addDataActivity = async (msg)=>{
    try{
        await fetch('https://todo.api.devcode.gethired.id/activity-groups?email=elangyudharakasiwi@gmail.com',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title: 'new Activity',
                email:'elangyudharakasiwi@gmail.com'
            })
        })
        
    }
    catch(e){
        console.log(msg)
    }
}

export default addDataActivity