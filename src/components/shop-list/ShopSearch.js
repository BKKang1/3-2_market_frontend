import { Input } from "antd";
import axios from "axios";
import {cloudServerIP} from "../../App"

const { Search } = Input;

function ShopSearch({ casId, selId, searchText, serverData ,setServerData,pageNum,pageSize,totalItemNum,setPageNum,setPageSize,setTotalItemNum }) {
  const onSearch = (value) => {
    searchText.current = value;
    console.log(searchText);
    axios
      .get(
        cloudServerIP + `/api/products?productName=${searchText.current}&orderBy=${selId.current}&itemCategoryCode=${casId.current[0]}&itemCode=${casId.current[1]}&kindId=${casId.current[2]}&kindGradeId=${casId.current[3]}&pageSize=${pageSize}&pageNum=${pageNum}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      )
      .then((response) => {
        const data = response.data;

        setServerData(data.result);
        setTotalItemNum(data.lastPageNum * pageSize);
        console.log("serverdata: ", data);
      })
      .catch((error) => alert(error.response));
  };
  return (
    <Search
      placeholder="검색어 입력"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );
}
export default ShopSearch;
