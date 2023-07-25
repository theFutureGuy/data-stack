import React, { useEffect, useState } from 'react';
import ListItem from "./components/ListItem"
import Auth from './components/Auth';
import {useCookies} from 'react-cookies'

function App() {
  // const email = 'ashiq@mail.com'
  const [Tasks,setTasks] = useState(null)
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const email = cookies.Email
  const authToken = cookies.AuthToken
  // const authToken = false
  
  const getData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${email}`)
      const json = await res.json()
      console.log(json)
      setTasks(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect( () => {
    if(authToken){
      getData()
    }
  },[])
  const sortedTasks = Tasks?.sort((a,b) => newDate(a.date) -  new Date(b.date))

  return (
    <div className='app'>
      {!authToken && <Auth/>}
      {
        authToken && 
      <>
        ListHeader listName={'ashiq'} getData={getData} 
        <p className='user-email'> Welcome Back {email}</p>
        {
          sortedTasks?.map((task) => <ListItem key={task.id} task={task}getData={getData} />)
        }
      </>
      }
      <p className='copyright'> Ashiq Code</p>
    </div>
  )
}

export default App