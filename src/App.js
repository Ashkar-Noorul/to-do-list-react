import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Task from './Task';

function App() {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleChange = (event) => {
    setNewTask(event.target.value);
  }

  //adding the new task to the todolist onclicking the button
  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList(task.taskName !== "" ? [...todoList, task] : todoList);
    setNewTask("");
  }

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  }
  const completeTask = (id) => {
    setTodoList(
      todoList.map((task)=>{
        if(task.id===id){
          return {...task,completed:true};
        }
        else{
          return task;
        }
      })
    );
  };
  return (
    <div className="App">
      <div className="addTask">
        <input value = {newTask} onChange={handleChange} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list">
        {todoList.map((task) => {
          return (
            <Task taskName={task.taskName}
              id={task.id} completed={task.completed} deleteTask={deleteTask}
              completeTask={completeTask} />
          )
        }
        )}

      </div>
    </div>
  );
}

export default App;
