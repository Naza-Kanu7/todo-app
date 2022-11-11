import React from 'react'
import { FaTrash } from 'react-icons/fa'

function Completed({completedList, trashHandler}) {
  // console.log(completedList)
  return (
    <div className='todo-box'>
      <h3>Completed List</h3>
      {completedList.map(completedItem =>
        <div className='list-item' key={completedItem.id}>
          <div className='item-title'><p>{completedItem.name}</p></div>
          <div className='icons-list'>
            <button className='trash' onClick={() => trashHandler(completedItem)}><FaTrash /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Completed