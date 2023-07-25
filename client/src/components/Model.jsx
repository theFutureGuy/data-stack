import React,{useState} from 'react'
import {useCookies} from 'react-cookies'


function Model({model,setShowModal,getData,task}) {
  const[cookies,setCookie,removeCookie] = useCookies(null)
  const mode = 'edit'
  const editmode = mode === 'edit' ? true:false
  const [data,setData] = useState({
    email: editmode ? task.email :cookies.Email ,
    title:editmode ? task.title:null,
    progress:editmode ?task.progress:50,
    date: editmode ? task.date : new Date()

  })

  const postData = async(e) => {
    try {
      e.preventDefault()
      const response = await fetch(`https://localhost:8000/todos`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),
      })
      if (response.status === 2000){
        setShowModal(false)
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try {
       const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
      {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),
      });
      if (response.status === 200){
        setShowModal(false)
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  const handleChange = (e) => {
    console.log("changing...")
    const {name,value} = e.target;
    setData(data =>({
      ...data,
      [name] : value
    }) )
    console.log(data)
  }
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h1>{mode} a task here..</h1>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input required maxLength={30} placeholder='Your task goes here' name='title' value={data.title} onChange={handleChange}/> <br />
          <label>Drag to select your current progress</label>
          <input required type='range' min='0' max='100' name='progress' value={data.progress} onChange={handleChange} /> <br />
          <input  className={model} type='submit' onClick={editmode ? editData : postData}/>
        </form>
      </div>
    </div>
  )
}

export default Model