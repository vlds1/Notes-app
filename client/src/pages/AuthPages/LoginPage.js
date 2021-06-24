import React, { useState, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../contexsts/auth.context'

export const LoginPage = () => {
    const auth = useContext(AuthContext)

    const { request, loading } = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        const data = await request('/api/auth/login', 'POST', {...form})
        console.log('Login dataaa: ', data)
        auth.login(data.token, data.userId)

    }

    const pressHandler = async event => {
        if(event.key === "Enter"){
            try {
                const data = await request('/api/auth/login', 'POST', {...form})
                auth.login(data.token, data.userId)
            } catch (error) {
                
            }
        }
    }

    return(
        <div className="container">
            <div className="login-card grey darken-4">
                <div className="login-title center">
                    Sign in
                </div>
                <div className="login-input">
                    <label htmlFor="email">email</label>
                    <input className="login-email white" type="text" id="email" name="email"
                    onChange={changeHandler} onKeyPress={pressHandler}
                    />

                    <label htmlFor="password">password</label>
                    <input className="login-password white" type="password" id="password" name="password"
                    onChange={changeHandler} onKeyPress={pressHandler}
                    />
                </div>
                <div className=" center">
                    <button onClick={loginHandler} disabled={loading} className="login-btn btn btn-smal teal loghten-2">sign in</button>
                </div>
            </div>
        </div>
    )
}