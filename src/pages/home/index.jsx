import { useState } from "react";
import { message } from 'antd';
import UploadFile from "../../components/upload-file";
import { useDispatch, useSelector } from 'react-redux';
import "./index.css"
import { getCategoriesThunk, selectCategory, updateUrl } from "../../redux/dropdown-slice";

const HomePage = () => {
  const [input,setInput] = useState('https://development.matbao.website');
  const url = useSelector(state => state.dropdownReducer.url);
  const dispatch = useDispatch()

  const onConfirm = () =>{
    var tmpInput = input
    if(url === input) return
    if(input.length <= 0){
      message.error("Đường dẫn không hợp lệ");
      return
    }
    if (input.endsWith("/")) {
      tmpInput = input.slice(0, -1)
      setInput(tmpInput)
    } 
    dispatch(updateUrl(tmpInput))
    dispatch(getCategoriesThunk(tmpInput))
    dispatch(selectCategory([]))
    message.success("Cập nhật đường dẫn thành công")
    
  }

  return (
    <div className='container'>
      <p style={{fontWeight:600}}>{url}</p>
      <div class="input-container">
        <input placeholder="Nhập url website" value={input} onChange={e => setInput(e.target.value)}/>
        <div><span onClick={onConfirm}>Cập nhật</span></div>
      </div>
      <div className='file-container'>
        <UploadFile />
      </div>
    </div>
  );
};
  
  export default HomePage;