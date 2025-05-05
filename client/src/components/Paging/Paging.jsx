import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getProductByBrandByPage, getProductByCatByPage, getProductBySubByPage } from '../../services/productServices';

export default function Paging({ totalPage, setProduct, id, type="category",subId,brandID }) {
  console.log("check type: ",brandID);
  
  const defaultSize = 8;
  const handleByPage = async (even, page) => {
    const actualPage = page - 1;
    if(type === "category"){
      const response = await getProductByCatByPage(id, actualPage, defaultSize);
      if(response){
        setProduct(response);
      }
    }
    else if(type === "subcategory"){
      const response_2 = await getProductBySubByPage(subId,actualPage,defaultSize);
      console.log(response_2.content);
      setProduct(response_2.content);
    }
    else{
      console.log("babyb");
      
      const response_3 = await getProductByBrandByPage(brandID,actualPage,defaultSize);
      setProduct(response_3.content);;
    }
  }
  return (
    <Stack spacing={2} alignItems={'center'}>
      <Pagination count={totalPage} variant="outlined" color="primary" onChange={handleByPage} />
    </Stack>
  );
}