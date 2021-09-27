import React from 'react';

function MidContent(props){
    return(
        <div>
            <form className='form' onSubmit={e=>{e.preventDefault();}}>
                <input className='formText' name='textArea' type='text' placeholder='Enter task here...' onKeyPress={(event)=>props.updateInput(event)}></input>
                <input className='formSubmit' name='Submit' type='submit' value ='Add' onClick={()=> props.handleAdd()}></input>
            </form>
            <div className='buttonBox'>
                <button 
                    className='buttons'
                    style = {{borderColor:props.taskStatus==="current" && "#2D6A4F"}}//Styles selected button differentlys
                    onClick = {()=> props.handleStatus(1)}
                >All</button>
                <button 
                    className='buttons'
                    style = {{borderColor:props.taskStatus==="remaining" && "#2D6A4F"}}
                    onClick = {()=> props.handleStatus(2)}
                >Remaining Tasks</button>
                <button 
                    className='buttons'
                    style = {{borderColor:props.taskStatus==="completed" && "#2D6A4F"}}
                    onClick = {()=> props.handleStatus(3)}
                >Completed Tasks</button>
            </div>
        </div>
    )
}

export default MidContent;