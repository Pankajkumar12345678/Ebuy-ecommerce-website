const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct=async(category)=>{
    try{
        const response = await fetch(SummaryApi.categoryWiseProduct.url,{
            method:SummaryApi.categoryWiseProduct.method,
            headers:{
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                category:category
            })
        })
    
        const dataResponse = await response.json()
    
        return dataResponse
    }
    catch (err) {
        console.log("fetchCategoryWiseProduct error:", err);
      }
}

export default fetchCategoryWiseProduct