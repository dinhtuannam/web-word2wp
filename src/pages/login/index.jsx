import { Button, Form, Input } from 'antd';
import { Login } from '../../services/login-service';
import { jwtDecode } from 'jwt-decode';
import './index.css'
import { useState } from 'react';

const LoginPage = () => {
  const [loading,setLoading] = useState(false)
  const [msg,setMsg] = useState("")
  const onFinish = async(values) => {
    setLoading(true);
    const res = await Login(values.username,values.password)
    if(res.retCode === 0){
      const decodedToken = jwtDecode(res.data.token);
      setCookie("wp_tool_cookie",res.data.token,decodedToken.exp)
      window.location.href = "/";
    }
    else{
      setMsg(res.retText)
    }
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const setCookie = (name, value, expiration) => {
    var expires = new Date(expiration * 1000).toUTCString();
    document.cookie = name + "=" + value + "; expires=" + expires + "; path=/";
  }

  return (
      <>
        <div className='container'>
          <h2 style={{marginLeft:'24px'}}>Đăng nhập</h2>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 12,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tài khoản "
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên tài khoản hoặc email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Nhập mật khẩu',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {msg !== "" && <p style={{color:'red',fontWeight:600}}>{msg}</p>}
            <Form.Item
              wrapperCol={{
                offset: 1 ,
                span: 18,
              }}
            >
              <Button type="primary" htmlType="submit" loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  };
  
export default LoginPage;