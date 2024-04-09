import { Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk, selectCategory } from '../../redux/dropdown-slice';

  const DropdownComp = () => {
    const data = useSelector(state => state.dropdownReducer.list);
    const loading = useSelector(state => state.dropdownReducer.loading);
    const url = useSelector(state => state.dropdownReducer.url);
    const dispatch = useDispatch()

    useEffect(() =>{
      dispatch(getCategoriesThunk(url))
    },[])

    const onChange = (value) => {
      dispatch(selectCategory(value));
    };
    return (
      <Select
        mode="tags"
        style={{
          width: '100%',
        }}
        placeholder={loading ? "Đang tải dữ liệu, vui lòng chờ trong giây lát" : "Chọn danh mục bài viết"}
        onChange={onChange}
        options={data}
    />
    );
  };
  
export default DropdownComp;