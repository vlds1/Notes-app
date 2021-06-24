import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Navbar } from '../components/navbar'
import { AuthContext } from '../contexsts/auth.context'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/loader'
import { NotesList } from '../components/NotesList'

export const NotesPage = () => {
    const navbar = Navbar()
    const [notes, setNotes] = useState([])
    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext)

    const fechedNotes = useCallback(async () => {
        const feched = await request('/api/note/notes', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setNotes(feched)
    }, [request, token])
    
    useEffect(() => {
        fechedNotes()
    }, [fechedNotes])

    if (loading) {
        <Loader></Loader>
    }

    

    return(
        <div>
            {navbar}
            <div className="notes-page-content">
                <div className="container index-text">
                {!loading && <NotesList notes={notes}></NotesList>}
                </div>
            </div>
        </div>
    )
}