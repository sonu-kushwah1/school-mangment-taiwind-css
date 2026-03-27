"use client";
import { useState } from "react";
import { GiRaceCar } from "react-icons/gi";

export default function DynamicInput() {
  const [inputs, setInputs] = useState([""]);

  const handleChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        <GiRaceCar /> Dynamic Inputs
      </h2>

      {inputs.map((input, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Input ${index + 1}`}
          />

          <button onClick={() => removeInput(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addInput}>Add Input</button>

      <pre>{JSON.stringify(inputs, null, 2)}</pre>
    </div>
  );
}