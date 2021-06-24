import React from 'react'
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { AuthContext } from './contexsts/auth.context'
import { useAuth } from './hooks/auth.hook'
import { Loader } from './components/loader'

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthed = !!token
  const routes = useRoutes(isAuthed)
  
  if(!ready){
    return <Loader></Loader>
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthed
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  )
}

export default App
