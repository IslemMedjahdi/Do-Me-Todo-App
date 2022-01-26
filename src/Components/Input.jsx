import React, { useState,useContext } from 'react';
import { ActionsContext } from '../App';
import { ACTIONS } from '../App';

const Input = () => {
    const [value,setValue] = useState("");
    const {dispatch} = useContext(ActionsContext);
    const submitHandler = (e) => {
        e.preventDefault();
        if (value.trim() !== ""){
            dispatch({type: ACTIONS.ADD_TODO,payload:{text: value}});
            setValue("");
        }
    }
    return (
        <form className='w-full mt-5' onSubmit={submitHandler}>
            <input className='w-full dark:text-white outline-none text-gray-900 dark:bg-gray-800 rounded px-4 py-3' value={value} onChange={(e) => setValue(e.target.value)} type='text' placeholder='Create a new todo and Press Enter...' />
        </form>
    );
}

export default Input;
