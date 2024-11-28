import React, { useState } from "react";

const FormExample = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    alert(`Thank you, ${name}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
      <br/>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormExample;
