import { message, Upload, Button } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector ,useDispatch } from 'react-redux';
import { getCategoriesThunk } from '../../redux/dropdown-slice';
import { DevUrl, ProductionUrl } from '../../utils/backend';
import "./index.css"
import DropdownComp from '../dropdown';

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const category = useSelector(state => state.dropdownReducer.category);
  const url = useSelector(state => state.dropdownReducer.url);
  const dispatch = useDispatch()

  console.log(category);

  const getCategories = () =>{
    return category.join(', ');
  }

  const handleUpload = () => {
    const formData = new FormData();
    if(category.length <= 0){
      message.error('Vui lòng chọn danh mục');
      return;
    }
    fileList.forEach((file) => {
      
      formData.append('files', file);
    });
    setUploading(true);
  
    fetch(`${ProductionUrl}/Tool/upload?categories=${getCategories()}&url=${url}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.retCode === 0) {
          setFileList([]);
          dispatch(getCategoriesThunk(url))
          message.success(res.retText);
        } else {
          message.error(res.retText);
        }
      })
      .catch(() => {
        message.error('Tải file thất bại');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip','application/x-zip-compressed'];
      const isAllowed = allowedTypes.includes(file.type);
      if (!isAllowed) {
        message.error('Chỉ có thể upload file doc, docx và zip');
        return;
      }
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props} style={{
          height: 40
        }}>
        <Button icon={<UploadOutlined />}>Tải lên file doc, docx hoặc zip</Button>
      </Upload>
      <div className='dropdown-container' style={{marginTop:6}}>
          <DropdownComp />
      </div>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 6,
        }}
      >
        {uploading ? 'Đang tiến hành upload' : 'Bắt đầu upload'}
      </Button>
    </>
  );
}

export default UploadFile;
