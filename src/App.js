import React from 'react';
import Header from './Components/Header';
import MidContent from './Components/MidContent';
import MainContent from './Components/MainContent';



class App extends React.Component{
  constructor() {
    super();
    this.state = {
      dataTasks : [], // Array of tasks
      status: "current", // Shows which category of tasks to be displayed
      taskId: 4,  // Id of new tasks added start at 4 since 3 is already in the json file
      inputValue: '' //Value of input field
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.updateInput = this.updateInput.bind(this);

  }

  //Loads tasks from the JSON file
  componentDidMount(){
    fetch('./data.json')
    .then(response=>
      response.json()
    ).then(data =>{
        this.setState({
          dataTasks: data
        })
    })
    
  }
  
  //Handles the check method for the check boxes of each task item
  handleChange(id){
    this.setState(prevState=>{
      const updatedTasks = prevState.dataTasks.map(todo=>{
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
        return todo;
      })
      return {
        dataTasks : updatedTasks //Updates the new task array
      }
    }
    )
  }

  //Handles the changes category
  handleStatus(num){
    var newStatus;
    if(num === 1){
      newStatus = "current";
    }
    else if(num === 2){
      newStatus = "remaining";
    }
    else if(num === 3){
      newStatus = "completed";
    }

    this.setState({
      status: newStatus
    })
  }

  //Removes a tasks from the array after deletion
  handleRemove(id){
    this.setState(prevState=>{
      const updatedTasks = prevState.dataTasks.filter(todo=> todo.id !== id)
      return {
        dataTasks : updatedTasks
      }
      }
    )
  }

  //Adds new task to the array
  handleAdd(){
    const newObject = {};
    newObject.id = this.state.taskId;
    newObject.task = this.state.inputValue;
    newObject.completed = false;
    const updatedTasks = this.state.dataTasks.slice(); //creates a copy of the array
    updatedTasks.push(newObject); //Adds new tasks to the array
    this.setState(prevState=>{
      return {
        dataTasks : updatedTasks, // Update sthe array 
        taskId : prevState.taskId + 1, //Updates the task ID
      }
      }
    )
    alert("Clear input field to add another task.");
  }

  //Updates the input value
  updateInput(event){
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {
    //Shows which tasks to be displayed based on the category chosen
    var showTasks;
    if(this.state.status === "current"){
       showTasks = this.state.dataTasks.map((item) =>{
        return (
           <MainContent key={item.id} item={item} handleChange={this.handleChange} handleRemove={this.handleRemove}/> 
          )
        });
    }
    else if(this.state.status === "remaining"){
      showTasks = this.state.dataTasks.filter((item) => (item.completed === false)).map((items)=>{
          return (
            <MainContent key={items.id} item={items} handleChange={this.handleChange} handleRemove={this.handleRemove}/> 
            )
          }
        );
    }
    else if(this.state.status === "completed"){
      showTasks = this.state.dataTasks.filter((item) => (item.completed === true)).map((itemss)=>{
          return (
            <MainContent key={itemss.id} item={itemss} handleChange={this.handleChange} handleRemove={this.handleRemove}/> 
            )
          }
        );
    }
    
    
    return (
      <div >
        <Header />
        <MidContent taskStatus = {this.state.status} handleStatus = {this.handleStatus} handleAdd ={this.handleAdd} updateInput={this.updateInput}/>
        <h2  className="taskNumber">{showTasks.length>0?showTasks.length:"No"} tasks in this category.</h2>
        {showTasks}
      </div>
    );
  }
}

export default App;
