import { postDataRequest } from "../utils/backend"

export const Login = async(username,password) =>{
    const path = `/Tool/login?username=${username}&password=${password}`
    const res = await postDataRequest(path,{})
    if(!res) return {
        retCode: 1,
        retText: "Đăng nhập thất bại",
        data: null
    }
    return res;
}

