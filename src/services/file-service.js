import { postDataRequest } from "../utils/backend"
export const UploadFile = async(file) =>{
    const path = "/Tool/upload"
    const res = await postDataRequest(path,file)
    return res;
}