import { postDataRequest } from "../utils/backend"
export const UploadFile = async(categories,file) =>{
    const path = `/Tool/upload?categories=${categories}`
    const res = await postDataRequest(path,file)
    return res;
}