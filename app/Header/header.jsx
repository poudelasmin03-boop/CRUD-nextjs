"use client";

import {  useEffect, useState } from "react";
import "./header.css";

export default function ProductsPage() {
 
  const [products,setProduct]=useState([]);
  const[name,setName]=useState("");
  const[update,setUpdate] =useState(null)
  const[stock,setStock]=useState("");

  // get all product
  
  const getData = async()=>{
    
  const response = await fetch("http://127.0.0.1:8000/products/")
  const data = await response.json()

  if (response.ok){
    console.log("All ok")
    setProduct(data.items)
  
  }
  else{
    console.log("Error mathi error")
  }
}
useEffect(()=>{
getData();
},[])

   //Post the data
  
    const submitForm= async (e)=>{
      const formData = new FormData();

      formData.append("name",name)
      formData.append("stock",stock)


      e.preventDefault()
      const response = await fetch("http://127.0.0.1:8000/products/",{
        method:"POST",
        body:formData
      });
      const data = await response.json()

      if (response.ok){
        console.log("Ok")
        alert("added successfully")
        getData()
        setName("")
        setStock("")
      }
      else{
        console.log("Error")
        console.log(data)
      }
    
    }
   
    //delete data

    const deleteData = async (id)=>{
      if(id == undefined){
        return 
      }
      const response = await fetch(`http://127.0.0.1:8000/products/${id}`,{
        method:"DELETE"
      })
      const data  = await response.json()

      if (response.ok){
        alert("Sucessfully deleted")
        getData();
      }
      else{
        console.log("Error marthi error")
      }
    }


    //Update 
    const updateData  =async(id)=>{
       const formData = new FormData();

      formData.append("name",name)
      formData.append("stock",stock)

      const response = await fetch(`http://127.0.0.1:8000/products/id/${id}`,{
        method:"PUT",
        body:formData
      })
      const data  =  await response.json()
      if (response.ok){
        alert("Update")
        setName("")
        setStock("")
        getData()
      }
      else{
        console.log("Error mathi error xa")
      }
    }
    
  return (
    <div className="product-container">

      <h1>Product Management</h1>

      {/* INSERT FORM */}
      <div className="product-form">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button  type="submit"> 
          Add Product
        </button>
        </form>

      </div>

      {/* PRODUCT LIST */}
      <table className="product-table">

        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        {
        products.length>0?(

        <tbody>
          {products.map((product) => 
          (
          
            <tr key={product.id}>

              <td>{product.name}</td>

              <td>{product.stock}</td>

              <td>

                <button
                onClick={()=>{
               
                setName(product.name)
                setStock(product.stock)
                 updateData(product.id);
                }

                }
                  className="update-btn"
                  
                >
                  Update
                </button>

                <button
                onClick={()=>deleteData(product.id)}
                  className="delete-btn"
                  
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>
        ):(
          <tbody>
            <tr>
              <td>
                 Items are not available
                </td></tr>
          </tbody>
        )
      }

      </table>

    </div>
  );
}