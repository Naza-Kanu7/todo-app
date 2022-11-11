import React from 'react'
import { FaRegHandPointRight, FaTrash } from 'react-icons/fa'

function InProgress({ inProgressList, onCompleted, trashHandler }) {
  // console.log(inProgressList)
  return (
    <>
      <div className='todo-box'>
        <h3>In Progress List</h3>
        {inProgressList.map(progressItem =>
          <div className='list-item' key={progressItem.id}>
            <div className='item-title'><p>{progressItem.name}</p></div>
            <div className='icons-list'>
              <button className='start' onClick={() => onCompleted(progressItem)}><FaRegHandPointRight /></button>
              <button className='trash' onClick={() => trashHandler(progressItem)}><FaTrash /></button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default InProgress