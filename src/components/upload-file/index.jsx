import { message, Upload } from 'antd';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector ,useDispatch } from 'react-redux';
import { getCategoriesThunk } from '../../redux/dropdown-slice';
import "./index.css"

const UploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [failed, setFailed] = useState('');
  const category = useSelector(state => state.dropdownReducer.category);
  const dispatch = useDispatch()

  const getCategories = () =>{
    return category.join(', ');
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setLoading(false);
      if(info.file.response?.retCode === 1){
        message.error(info.file.response?.retText);
      }
      else{
        if(info.file.response?.data?.failed?.length > 0){
          setError(true);
          setFailed(info.file.response?.data?.failed.join(', '))
        }
        else{
          setError(false);
          setFailed('');
        }
        dispatch(getCategoriesThunk())
        message.success(`Tải file thành công`);
      }
    }
    if (info.file.status === 'error') {
      setLoading(false);
      message.error(`Tải file thất bại`);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        width: 280
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {loading ? "Đang tiến hành upload file" : "Tải lên file doc, docx hoặc zip"}
        
      </div>
    </button>
  );

  const beforeUpload = (file) => {
    console.log(file);
    const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip','application/x-zip-compressed'];
    const isAllowed = allowedTypes.includes(file.type);
    if (!isAllowed) {
      message.error('Chỉ cho phép upload file doc, docx và zip');
      return false;
    }
    if (category.length <= 0) {;
      message.error('Vui lòng chọn danh mục bài viết');
      return false;
    }
    return true;
  };

  return (
    <>
      <Upload
        name="file"
        listType="picture-card"
        className="file-uploader"
        showUploadList={true}
        action={`https://api-word2wp.sunshine.software/api/Tool/upload?categories=${getCategories()}`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      {error && 
        <div class="failed-file">
          <span style={{marginRight:8}}>File tải thất bại :</span>
          <span>{failed}</span>
        </div>
      }
    </>
  );
}

export default UploadFile;
