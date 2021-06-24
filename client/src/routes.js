import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom' 
import { IndexPage } from './pages/index'
import { CreatePage } from './pages/CreatePage'
import { LoginPage } from './pages/AuthPages/LoginPage'
import { RegisterPage } from './pages/AuthPages/RegisterPage'
import { NotesPage } from './pages/NotesPage'

export const useRoutes = isAuthed => {
    if (isAuthed) {
        return(
            <Switch>
                <Route path="/create" exact>
                    <CreatePage></CreatePage>
                </Route>
                <Route path="/notes" exact>
                    <NotesPage></NotesPage>
                </Route>
                <Route path="/" exact>
                    <IndexPage></IndexPage>
                </Route>
                <Route path="/today" exact>
                    <IndexPage></IndexPage>
                </Route>
                <Route path="/important" exact>
                    <IndexPage></IndexPage>
                </Route>
                <Route path="/sidenotes" exact>
                    <IndexPage></IndexPage>
                </Route>
                <Redirect to="/notes"></Redirect>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <IndexPage></IndexPage>
            </Route>
            <Route path="/register" exact>
                <RegisterPage></RegisterPage>
            </Route>
            <Route path="/login" exact>
                <LoginPage></LoginPage>
            </Route>
            <Redirect to="/"></Redirect>
        </Switch>
    )
}