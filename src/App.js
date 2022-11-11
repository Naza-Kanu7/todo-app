import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import InProgress from './components/InProgress/InProgress.component';
import Completed from './components/Completed/Completed.component';
import ToDo from './components/ToDo/ToDo.component';

function App() {
  const [todoAdd, settodoAdd] = useState(true)
  const [newToDo, setNewToDo] = useState([])
  const [inProgressList, setInProgressList] =useState([])
  const [todoIdToUpdate, setTodoIdToUpdate] = useState('')
  const [completedList, setCompletedList] = useState([])

  const setToDoLocalStorage =(newToDo) => {
    window.localStorage.setItem('toDoList', JSON.stringify(newToDo))
  }
  const setInProgressLocalStorage =(inProgressList) => {
    window.localStorage.setItem('inProgressList', JSON.stringify(inProgressList))
  }
  const setCompletedLocalStorage =(completedList) => {
    window.localStorage.setItem('completedList', JSON.stringify(completedList))
  }

  useEffect( () => {
    const listItems = JSON.parse(localStorage.getItem('toDoList'));
    if (listItems) {
     setNewToDo(listItems);
    }
  }, [])

  useEffect( () => {
    const listItems = JSON.parse(localStorage.getItem('inProgressList'));
    if (listItems) {
      setInProgressList(listItems);
    }
  }, [])

  useEffect( () => {
    const listItems = JSON.parse(localStorage.getItem('completedList'));
    if (listItems) {
      setCompletedList(listItems);
    }
  }, [])

  const addToList = () => {
    const inputValue = document.querySelector('#input-text').value
    // console.log(inputValue)
    if (inputValue.trim().length !== 0 ) {
      const newval = [...newToDo, {id:uuid(), name:inputValue}]
      setNewToDo([...newval])
      setToDoLocalStorage(newval)
      document.querySelector('#input-text').value = ''
    } else {
      alert('Please Input a Task!')
    }
  }

  const onStart = (item) => {
    setInProgressList(inProgressList.concat(item))
    setInProgressLocalStorage(inProgressList.concat(item))
    const updatedToDoList = newToDo.filter(newItem => newItem.id !== item.id)
    setNewToDo(updatedToDoList)
    setToDoLocalStorage(updatedToDoList)
  }
  
  const editInput = (item) => {
    document.querySelector('#input-text').value = item.name
    setTodoIdToUpdate(item.id)
    settodoAdd(false)
  }
  const editHandler = () => {
    // console.log(todoIdToUpdate)
    const updatedToDoList = [...newToDo]
    const toDoItemIndex = updatedToDoList.findIndex(item => item.id === todoIdToUpdate)
    updatedToDoList[toDoItemIndex].name = document.querySelector('#input-text').value
    setNewToDo(updatedToDoList)
    setToDoLocalStorage(updatedToDoList)
    settodoAdd(true)
    document.querySelector('#input-text').value = ''
    setTodoIdToUpdate('')
  }
  const onCompleted = (completeItem) => {
    setCompletedList(completedList.concat(completeItem))
    setCompletedLocalStorage(completedList.concat(completeItem))
    // console.log(completedList)
    const updatedInProgressList = inProgressList.filter(newItem => newItem.id !== completeItem.id)
    setInProgressList(updatedInProgressList)
    setInProgressLocalStorage(updatedInProgressList)
  }
  const trashHandlerToDo = (trashitem) => {
    // const updatedToDoList = [...newToDo]
    const updatedToDoList = newToDo.filter(newItem => newItem.id !== trashitem.id)
    setNewToDo(updatedToDoList)
    setToDoLocalStorage(updatedToDoList)
  }
  const trashHandlerInProgress = (trashitem) => {
    const updatedInProgressList = inProgressList.filter(newItem => newItem.id !== trashitem.id)
    setInProgressList(updatedInProgressList)
    setInProgressLocalStorage(updatedInProgressList)
  }
  const trashHandlerCompleted = (trashitem) => {
    const updatedCompletedList = completedList.filter(newItem => newItem.id !== trashitem.id)
    setCompletedList(updatedCompletedList)
    setCompletedLocalStorage(updatedCompletedList)
  }
  
  return (
    <div className="app-container">
      <h2>Naza's To Do App</h2>
      <div className='input-container'>
        <input 
          id='input-text'
          type='text' 
          placeholder='What Do You Have To Do?'
        />
        {todoAdd ? <button onClick={addToList}>Add</button> : <button onClick={editHandler}>Edit</button>}
        
      </div>
      <div className='todo-container'>
        <ToDo toDoList={newToDo} onStart={onStart} editInput={editInput} trashHandler={trashHandlerToDo} />
        <InProgress inProgressList={inProgressList} onCompleted={onCompleted} trashHandler={trashHandlerInProgress}/>
        <Completed completedList={completedList} trashHandler={trashHandlerCompleted} />
      </div>
    </div>
  );
}

export default App;
