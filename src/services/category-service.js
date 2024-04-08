import { postDataRequest, getDataRequest } from "../utils/backend"

export const getCategories = async() =>{
    const path = "/Tool/categories"
    const res = await getDataRequest(path,{})
    console.log(res);
    if(!res) return [];
    const categories = res.data.map((val,index)=>{
        return {
            value: val.name,
            label: val.name
        }
    })
    return categories;
}