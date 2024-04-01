import React, { useState } from 'react';
import './front.css';
import { motion } from "framer-motion"


export default function Front() {
    const [ data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [resData , setResData]=useState('');
    async function fun(e){
        e.preventDefault();

        const jsonData = {
            data: data,
            
        };

        fetch('http://localhost:4000', {
        method: 'POST', // or 'PUT', 'DELETE', etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }
        setIsLoading(true);
            // setIsLoading(true);
            // fetch('http://localhost:4000',{
            //    method:'GET',

            // })
            // .then(async (response)=>{
            //     // setResData(await response.json()[0].Data);
            //     // const temp =await response.json();
            //     // console.log(temp[0].Data)
            //     // setResData(temp[0].Data);
            //     response.json().then((data)=>{
            //         setResData(data[0].Data);
            //     })
               
            // })
            // setIsLoading(false)
        })
        .catch(error => {
        console.error('Error:', error);
        });


    }
    async function fun2(e){
        setIsLoading(true);
            fetch('http://localhost:4000',{
               method:'GET',

            })
            .then(async (response)=>{
                // setResData(await response.json()[0].Data);
                // const temp =await response.json();
                // console.log(temp[0].Data)
                // setResData(temp[0].Data);
                response.json().then((data)=>{
                    setResData(data[0].Data);
                })
               
            })
            setIsLoading(false)
    }
    return (
        <div className="user-input">
            <div className="heading">
                <h1>Text Summarizer</h1>
            </div>
            {/* this is the area where user will input its data. */}
            <div className="input-body">
                <motion.div
                initial={{ opacity: 0, x: -1000, y: 0}}
                animate={{ opacity: 1, x:0, }}
                exit={{ opacity: 0 }}
                transition = {{delay: 0.2 , duration: 1}}

                
                 className="input-area">
                    <form className="text-summarizer" onSubmit={fun}>
                        <textarea
                        rows={10}
                        cols={20}
                            className='input-field' 
                            type="text"   
                            placeholder="Enter text here..."
                            onChange={(e)=>{setData(e.target.value)}}
                        /><br/>

                        <button 
                            className="submit-btn" 
                        >Summarize</button>
                    </form>
                </motion.div>  
                <div className='output-area'>
                <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="response-data"
                    >
                        {
                            isLoading 
                            ? (
                                <div className="loader"></div>
                            ) 
                            : <p>{resData}</p>
                        }
                    </motion.div>
                    <button onClick={fun2}className='write'>Write</button>
                </div>
            </div>
        </div>
    );
}
