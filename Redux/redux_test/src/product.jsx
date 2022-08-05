import React, { useState, useEffect } from 'react';
import { useGetLoggedUserProfileDataQuery, useGetProductDataQuery } from './services/UserAuthApi'
import { getToken, removeToken } from './services/LocalStorageService';
import {Card,CardContent,CardActions,CardMedia,Stack,Typography, Grid} from '@mui/material'; 


const Product = () => {
    // const {data, isSuccess}= useGetProductDataQuery()
    // const [products, setProducts] = useState({
    //   image:''
    // });
    // const data  = useGetProductDataQuery();
    // useEffect(() => {
    //   setProducts({
    //     image : data.product_image
    //   })
    // }, []);

    const productimage = useGetProductDataQuery()

    // const [productdata, setProductData] = useState({
    //   image : '', 
    // })
    // useEffect(()=>{
    //   if (data && isSuccess) {
    //     setProductData({
    //       image:data.product_image
    //     }   
    //     )
    //   }
    // }, [data, isSuccess])

    // console.log(productdata)


    // const [productdata, setProductData] = useState([{
    //   image:'',
    // }])
    // useEffect(()=>{
    //   if (data && isSuccess) {
    //     setProductData({
    //       image:data.product_image
    //     }   
    //     )
    //   }
    // }, [data, isSuccess])


    const displayImg = (img) => {
      return(
        <>
        {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <img src={img.product_image} alt="user 1" width={100}  />
            
        </div> */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Card sx={{ maxWidth: 100, display: "flex", flexWrap: "wrap"}}>
            <CardMedia component="img"  sx={{backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center',m:1 }} image={img.product_image} alt="user1" /> 
          </Card>
        </div>
        </>

          
        
        
      )
     }


    
  return (
    <div> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti illo temporibus delectus alias, ullam qui 
    {/* <img src={path} alt="pic1" width='200' height='200' /> */}
    {/* {
      data.keys().map((img, i)=>{
        <div key={i}>
        <img src={img.prouduct_image} alt="pic1" />
      </div>
      }

      )
    } */}
    {productimage.data ? (
      productimage.data.map((img) => displayImg(img))
    ) : (
      <h1>loading...</h1>
    )}
    </div>
  )
}

export default Product