import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'

export const RegisterPage = () => {
    const { request, loading } = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data from back: ', data)
        } catch (error) {
            
        }
    }

    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try {
                await request('/api/auth/register', 'POST', {...form})
            } catch (error) {
                
            }
        }
    }


    return(
        <div className="container">
            <div className="register-card grey darken-4">
                <div className="register-title center">
                    Create account
                </div>
                <div className="register-input">
                    <label htmlFor="email">email</label>
                    <input className="white" type="text" id="email" name="email"
                    onChange={changeHandler}
                    onKeyPress={pressHandler}
                    />

                    <label htmlFor="password">password</label>
                    <input className="white" type="password" id="password" name="password"
                    onChange={changeHandler}
                    onKeyPress={pressHandler}
                    />
                </div>
                <div className="register-btn center">
                    <button onClick={registerHandler} disabled={loading} className="btn btn-smal grey darken-3">Create</button>
                </div>
            </div>
        </div>
    )
}