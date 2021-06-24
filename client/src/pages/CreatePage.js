import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Navbar } from '../components/navbar'
import { AuthContext } from '../contexsts/auth.context'
import {useHttp} from '../hooks/http.hook'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const history = useHistory()
    const [note, setNote] = useState('')

    const navbar = Navbar()

    const pressHandler = async event => {
        if (event.key === 'Enter'){
            try {
                const data = await request('/api/note/create', 'POST', {title: note}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log('Nooote data: ', data)
                setNote('')
                history.push('/notes')
            } catch (error) {}
        }
    }

    const createHandler = async () => {
        try {
            await request('/api/note/create', 'POST', {title: note}, {
            Authorization: `Bearer ${auth.token}`
            })
            history.push('/notes')
        } catch (error) {
            
        }

    }

    return(
        <div>
            {navbar}
            <div className="container">
                <div className="create-input">
                    <input type="text" id="note" placeholder="Create a note" value={note} 
                    onChange={e => setNote(e.target.value)} 
                    onKeyPress={pressHandler}
                    />
                </div>
                <div className="create-btn">
                    <button className="btn btn-small grey darken-3" onClick={createHandler}>Create</button>
                </div>
            </div>
        </div>
    )
}