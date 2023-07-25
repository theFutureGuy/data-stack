import React,{useState} from 'react'
import Model from './Model'
import {useCookies} from 'react-cookie'

function ListHeader({listName,getData}) {
  const [showModal,setShowModal] = useState(null)
  const signout = () =>{
    console.log("signout")
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }


  return (
    <div className='list-header'>
      <h1>{listName}</h1>
      <div className='btn-container'>
        <button className='create' onClick={() => setShowModal(true)}>CREATE ACCOUNT</button>
        <button className='signout' onClick={signout}>SIGN OUT</button>
      </div>
     { showModal && <Model model={'create'} setShowModal={setShowModal} getData={getData}/>}
    </div>
  )
}

export default ListHeader