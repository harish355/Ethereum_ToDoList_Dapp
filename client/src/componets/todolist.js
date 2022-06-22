// import {Outlet,Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IoRemoveCircleSharp } from "react-icons/io5";
function Homepage({web3,accounts,contract}){
    
    const [message,setMessage]=useState([])
    const [task,setTasks]=useState('')
    const changeTask=(event)=>{
        setTasks(event.target.value)

    }
    const addTask= async()=>{
        const user_acc=await web3.eth.getAccounts();
        await contract.methods.Push_todo(task).send({ from: user_acc[0] });
        setTasks('')
    }

    const deleteTask=async(index)=>{
        const user_acc=await web3.eth.getAccounts();
        await contract.methods.remove(index).send({ from: user_acc[0] });
    }

    useEffect(async()=>{
        // console.log(web3)
        if(contract!=null && web3!=null && web3!=undefined)
        {
        const user_acc=await web3.eth.getAccounts();
        // // message=await web3.eth.getAccounts();
        // await contract.methods.Create("Harish").send({ from: user_acc[0] });
        
        // await contract.methods.Push_todo("0").send({ from: user_acc[0] });
        // await contract.methods.Push_todo("1").send({ from: user_acc[0] });
        // await contract.methods.Push_todo("2").send({ from: user_acc[0] });
        let temp=await contract.methods.getList().call({ from: user_acc[0] });
        console.log(temp)
        setMessage(temp)
        // await contract.methods.Push_todo("0").send({ from: accounts });
        // await contract.methods.Push_todo("1").send({ from: accounts[0] });
        // await contract.methods.Push_todo("2").send({ from: accounts[0] });

        // message = await contract.methods.getList().call();

        // alert(23)
        }

      },[contract,addTask])


    
    return(
        <div class="page-content page-container"  id="page-content">
            <ul className="nav" style={{ backgroundColor: "lightblue" }} >
                <li className="nav-item col-md-4">
                    <a className="nav-link active" href="#">Etherum To-do-list</a>
                </li>

                <li className="nav-item col-md-4 offset-md-4" >
                    <a className="nav-link disabled" href="#">{accounts}</a>
                </li>
            </ul>
            <div class="padding"  >
                <div class="row container d-flex justify-content-center">
                    <div class="col-md-12">
                        <div class="card px-3">
                            <div class="card-body">
                                <h4 class="card-title">Awesome Todo list</h4>
                                <div class="add-items d-flex"> 
                                    <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?" value={task} onChange={changeTask} /> 
                        
                                    <button class="add btn btn-primary font-weight-bold todo-list-add-btn"  onClick={addTask} >Add</button> </div>
                                <div class="list-wrapper">
                                    <ul class="d-flex flex-column-reverse todo-list">
                                        {message.map((ingredient, i) => (
                                        <li>
                                            <div class="form-check"> <label class="form-check-label">
                                                    <input class="checkbox" type="checkbox" /> {ingredient} <i class="input-helper"></i>
                                                    </label> </div> 
                                                <IoRemoveCircleSharp class="remove mdi mdi-close-circle-outline" onClick={
                                                    () => {
                                                        deleteTask(i);
                                                    } }/>
                                        </li>
                                        ))}


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
