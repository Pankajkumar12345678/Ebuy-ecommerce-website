const displayINRCurrency = (num)=>{
    const formatter = new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:'INR',
        minimumFractionDigits:0   // yaha  2 tha .00 means 
    })
    return formatter.format(num)
}

export default displayINRCurrency