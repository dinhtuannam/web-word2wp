import { Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk, selectCategory } from '../../redux/dropdown-slice';

  const DropdownComp = () => {
    const data = useSelector(state => state.dropdownReducer.list);
    const dispatch = useDispatch()

    useEffect(() =>{
      dispatch(getCategoriesThunk())
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
        placeholder="Chọn danh mục bài viết"
        onChange={onChange}
        options={data}
    />
    );
  };
  
export default DropdownComp;