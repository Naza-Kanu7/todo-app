import React from 'react'
import './Todo.css'
import { FaMarker, FaRegHandPointRight, FaTrash } from 'react-icons/fa'

function ToDo({ toDoList , onStart, editInput, trashHandler }) {
  
  return (
    <>
      <div className='todo-box'>
        <h3>To Do List</h3>
        <div className='todo-flex'>
          {toDoList.map(listItem =>
            <div className='list-item' key={listItem.id}>
              <div className='item-title'><p>{listItem.name}</p></div>
              <div className='icons-list'>
                <button className='start' onClick={() => onStart(listItem)}><FaRegHandPointRight /></button>
                <button className='edit' onClick={() => editInput(listItem)}><FaMarker /></button>
                <button className='trash' onClick={() => trashHandler(listItem)}><FaTrash /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ToDo