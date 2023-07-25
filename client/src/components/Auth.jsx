import React, { useState } from 'react'
import {useCookies} from 'react-cookies'

function Auth() {
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const [error,setError] = useState(null)
  const [isLogin,setIsLogin] = useState(true)
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [cnpassword,setCnpassword] = useState(null)


  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async(e,s) => {
      e.preventDefault()
      if(!isLogin && password !== cnpassword){
        setError('Something Wrong with inputs')
        return
      }
     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${s}`,
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
      })
      const data = await response.json()
      console.log(data)
      if(data.detail){
        setError(data.detail)
      }
      else{
       setCookie(data.email) 
       setCookie('AuthToken',data.token)
       window.location.reload()
      }
      
      
  }

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>{isLogin ? 'Please log in' : 'Please sign up!' }</h2>
          <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
         { !isLogin && <input type='confirm password' placeholder='confirm password' onChange={(e) => setCnpassword(e.target.value)}/>}
         <input type="submit" className="create" onClick={(s) => handleSubmit(e,isLogin? 'login':'signup')} />
         {error && <p>{error}</p>}
        </form>
        <div className='auth-options'>
          <button onClick={() => viewLogin(false)} style={{backgroundColor:!isLogin ?rgb(255,255,255):rgb(188,188,188)}}>Sign up</button>
          <button onClick={() => viewLogin(true)} style={{backgroundColor:!isLogin ?rgb(255,255,255):rgb(188,188,188)}}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Auth