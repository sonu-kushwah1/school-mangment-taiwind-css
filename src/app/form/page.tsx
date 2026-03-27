"use client";
import {useState} from "react";

export default function Form() {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  })
  const [list,setList]=useState([]);
  const handleChange=(e:any)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
  }
  const handleSubmit=(e)=>{
    setList(formData);
  }
  return (
    <div>
      <h1>Form</h1>
       <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Name"/><br/>
       <input type="email" onChange={handleChange} value={formData.email} placeholder="Email"/><br/>
       <input type="password" onChange={handleChange} value={formData.password} placeholder="Password"/><br/>
       <input type="submit" onSubmit={handleSubmit} value="Submit"/>
    </div>
  );
}