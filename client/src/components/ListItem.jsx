import React from 'react'
import TIcon from './TIcon'
import Progress from './Progress'
import { useState } from 'react'
import Model from './Model'


function ListItem({task,getData}) {
  const [showModal,setShowModal] = useState(false)
  const deleteItem = async() => {
    try {
     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
      method:'DELETE'
     })
      if (response.status === 200) {
        getData()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <li className='list-items'>
      <div className='info-container'>
        <TIcon />
        <p>{task.title}</p>
        <Progress />
        <div className='btn-container'>
          <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
          <button className='delete' onClick={() => deleteItem}>DELETE</button>
        </div>
      </div>
      {showModal && <Model mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  )
}

export default ListItem