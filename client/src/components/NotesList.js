import React from 'react'
import { useHttp } from '../hooks/http.hook'

export const NotesList = ({notes}) => {
    const { request } = useHttp()

    if (!notes.length) {
        return <p>No notes</p>
    }

    const deleteBtn = `${process.env.PUBLIC_URL}/img/delete.svg`

    const deleteHandler = async (noteId) => {
            try {
                await request(`/api/note/delete/${noteId}`, 'DELETE', null, {
                    noteId
                })
                function reload() {
                    document.location.reload()
                }
                reload()
            } catch (error) {}
    }
    
    return(
            <div>
                {notes.map((note) => {
                    return(
                        <div className="a-note" key={note._id}>
                            <span className="note-text">{note.title}</span>
                            <button className="delete-button btn btn-tiny" onClick={() => deleteHandler(note._id)}>
                                <img src={deleteBtn} alt="Delete" className="delete-btn-icon" />
                            </button>
                        </div>
                    )
                })}
            </div>
    )
}


//                            <input type="checkbox" id="note"/>
  //                          <span className="note-text">{note.title}</span>
    //                        <button className="delete-button btn btn-tiny" onClick={() => deleteHandler(note._id)}>
      //                          <img src={deleteBtn} alt="Delete" className="delete-btn-icon" />
        //                    </button>