import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Tasks from './components/Tasks'
import Header  from './components/Header'
import Footer from './components/Footer'
import AddTask from './components/AddTask'
import About from './components/About'
function App() {
  
  const [showAddTask, setShowAddTask] = useState(true) 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch ('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
    
    //const id = Math.floor(Math.random() * 10000) + 1
    //const newTask = {id, ...task}
    //setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter( (task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = async (id) => {
      
      //backend update
      const taskToToggle = await fetchTask(id)
      const updTask = {...taskToToggle, 
      reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'PUT', 
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      //update UI
      setTasks(tasks.map( (task) => task.id === id ? 
      {...task, reminder: data.reminder } : task))
  }

  return (
      <div className="container">
          <Header onAdd={() => setShowAddTask(!showAddTask)} title = "Task Tracker" showAdd = {showAddTask}/>
          { showAddTask && <AddTask onAdd = {addTask}/>}
          {tasks.length > 0 ? (
            <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
            ):(
              <h3>No Tasks to Show</h3>
            )
          }
          <Footer/>
      </div>
  );
}

export default App;
