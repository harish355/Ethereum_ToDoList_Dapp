// import {Outlet,Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
        <center>
            <h1>Etherum To-do-list</h1>
            <p><bold>User Address: {accounts}</bold> </p>
            {/* <p>{message}</p> */}
            <h4>Tasks</h4>
            {message.map((ingredient, i) => (
                <div>
                <p key={i} style={{
                    // borderStyle: "solid",
                    // borderColor: "red",
                }}>{i+1}.{ingredient} <button onClick={
                    ()=>{
                        deleteTask(i);
                    }
                }>Done</button></p>
                
                </div>
                ))}

             <p><input type="text" value={task} onChange={changeTask} />
                <button onClick={addTask}>Add</button>
             </p>
            </center>
            // {for i in message:}
    )
}

export default Homepage;