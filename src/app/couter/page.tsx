"use client";
import React, { useState } from 'react';

const Page = () => {
  const [count, setCount] = useState(0);

  function inc() {
    setCount(count + 1);
  }

  const dec=()=>{
    if(count>0){
        setCount(count-1);
    }else{
        setCount
    }
  }

  return (
    <div>
      <h4>Counter App {count}</h4>

      <button onClick={inc}>inc +</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>
  min -
</button>
    </div>
  );
}

export default Page;