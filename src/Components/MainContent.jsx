import React from 'react';

function MainContent(props){
    return (
        <main>
            <div className='tasks'>
                <input 
                    type= 'checkbox' 
                    name = 'check' 
                    checked={props.item.completed} 
                    onChange= {()=> props.handleChange(props.item.id)}>
                </input>
                <h3>{props.item.task}</h3>
                <button 
                    onClick= {()=> props.handleRemove(props.item.id)}
                >Delete</button>
            </div>
        </main>
    )
}

export default MainContent;