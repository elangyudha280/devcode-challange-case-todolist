

const parsingDate = (date)=>{
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateTostring = new Date(date).toLocaleDateString('id',options);
    return dateTostring
}

export default parsingDate