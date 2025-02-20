import React from 'react';
import { motion } from "framer-motion"
import {Box, VStack, Input, Checkbox, Button} from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from 'react';
import { requestroute } from '../../constants';
import Navbar from '../Navbar/Navbar';
function CreateProduct(props) {
    const InputStyle = {
        maxWidth: "500px" 
    }

    const currentuseremail  = "admintest@gmail.com"

    let [productdata, setProductdata] = useState({
         title: "",
         description: "",
         image: "",
         price: "",
         category:"",
         owner: currentuseremail
    });


    const handleSubmit = async (e)=>{
        e.preventDefault();

        let productvalues = Object.values(productdata);
        let allPresent = true;
        productvalues.map((eachElement)=>{
            if( eachElement.length == 0 ){

                allPresent = false;

            }

        })

        if(allPresent){
            try{

                let response = await axios.post(`${requestroute}product`, {
                    productdata
        
                });
                console.log(response);
        
               }catch(err){
        
                console.log(err);
        
               }
        }else{
            alert("all fields are required")
        }

      
    }


    const handleInputChange = (e)=>{
         const {name, value} = e.target;
         setProductdata({...productdata, [name]:value});
    }



    return (
      <>
      <Navbar/>
        <Box>
        <VStack onChange={handleInputChange}>
          <Input placeholder='enter product title' name="title" style={InputStyle} required/>
          <Input placeholder='Description' style={InputStyle} name="description" required/>
          <Input placeholder='Image' style={InputStyle} name="image" required/>
          <Input placeholder='price' type="number" style={InputStyle} name="price" required/>
          <Input placeholder='category' style={InputStyle} name="category" required/>
          <Button onClick={handleSubmit}>Create Product</Button>
       </VStack>
        </Box>
      </>
    );
}

export default CreateProduct;




// console.log(productdata);
// try{
//     const response = await axios.get("http://localhost:5000/");
//     let result = response.data
//     console.log(result);
// }catch(err){
//     console.log(err);
// }