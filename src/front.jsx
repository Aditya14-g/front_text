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
        console.log(jsonData);

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
        console.log(response)
            setIsLoading(true);
        })
        .then(data => {
        console.log('Response data:', data);
        })
        .catch(error => {
        console.error('Error:', error);
        });



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
                        ? ( // If isLoading is true, display the loader
                        <div className="loader-container">
                          <div className="loader"></div>
                          <p>Loading...</p>
                        </div>
                        ) 
                        :<h1>{}</h1>
                    }
                            <h2>Summary:</h2>
                            <p>hello</p>
                        </motion.div>
                </div>
            </div>
        </div>
    );
}
