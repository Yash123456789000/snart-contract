import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';
import './App.css';

function App() {
  const [contract, setContract] = useSate();
  const [todocount, setTodoCount] = useState(0);
  const [inputItem, setInputItem] = useState();
  const [inputListItem, setInputListItem] = useState();
  const [inputListItemRes, setInputListItemRes]= useState();

  const contractExecution = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.contract("0xd9145CCE52D386f254917e481eB44e9943F39138",abi,signer)
    setContract(contract)
  }

  const getTodoCount = async () => {
    if(contract){
      const res = await contract.count();
      setTodoCount(Number(res))
    }
  }

  useEffect(() => {
    contractExecution();
  },[])

  const handleChange = (e)=>{
    setInputItem(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await contract.todoList(inputItem-1);
  }

  const handleGetTodoList = async () => {
    const res = await contract.todoList(inputListItem);
    setInputListItemRes(res);
  }

  const handleTodoList = (e) => {
    setInputListItem(e.target.value);
  }


  return (
    <div>
      <button onClick={getTodoCount}>Get The Count</button>
      <h1>Count of todo:-{todoCount}</h1>
      <div>
        Enter the input value
        <input onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <input onChange={handleTodoList}></input>
        <button onClick={handleGetTodoList}>Get Todo List</button>
        <h3>{inputListItemRes}</h3>

      </div>
    </div>
  );
}

export default App;
