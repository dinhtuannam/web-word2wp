import { useState } from "react";
import UploadFile from "../../components/upload-file";
import DropdownComp from "../../components/dropdown";
import { Button, Form, Input } from "antd";
import { PlusCircleFilled } from '@ant-design/icons';
import "./index.css"
  
const formLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const HomePage = () => {
  const [category,setCategory] = useState({
    name:"",
    des:""
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name]: value
    }));
  };

  return (
    <>
      <div className='container'>
        <div className='file-container'>
          <UploadFile />
        </div>
        <div className='dropdown-container'>
          <DropdownComp />
        </div>
        {/* <div className='create-category-container'>
        <Form
          {...formLayout}
          variant="filled"
          style={{
            maxWidth: 600,
            }}
          >
           <div className='button'>
             <Button type="primary" htmlType="submit" icon={<PlusCircleFilled />}>
              Thêm mới danh mục
             </Button>
           </div>
 
            <Form.Item
             label="Tên danh mục"
             name="name"
             style={{marginRight:8}}
             rules={[
               {
                 required: true,
                 message: 'Nhập tên danh mục',
               },
             ]}
           >
             <Input name="name" value={category.name} onChange={handleInputChange} />
           </Form.Item>
           <Form.Item
             label="Mô tả danh mục"
             name="description"
              style={{marginRight:8}}
              rules={[
                {
                  required: true,
                  message: 'Nhập chú thích danh mục',
                },
              ]}
            >
              <Input name="des" value={category.des} onChange={handleInputChange} />
            </Form.Item>
          </Form>
        </div> */}
        </div>
       
      </>
    );
};
  
  export default HomePage;