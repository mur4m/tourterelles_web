import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { InputGroup } from '../components/inputGroup'
import { SubmitButton } from '../components/submitButton'

import api from '../utils/api'

const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [fieldError, setFieldError] = useState(null)
    const [errors, setErrors] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setFieldError(null)

        const body = {
            email,
            password
        }

        try {
            let result = await api.post('/users/authenticate',body );
            dispatch({ type: 'USER_SET', payload: result.data })
            history.push('/');
        }
        catch (err) {
            setErrors(err.response?.data?.message);
            dispatch({ type: 'USER_RESET' })
        }
    }

    return (
        <div>
            {
                errors && <p>{errors}</p>
            }
            <p>Login</p>
            <form onSubmit={handleSubmit}>
                <InputGroup handleChange={setEmail} isValid={fieldError !== "email"} label="Email" type="email" required />
                <InputGroup handleChange={setPassword} isValid={fieldError !== "password"} label="Password" type="password" required={true} minLength="1" maxLength="15" />
                <SubmitButton name="S'enregistrer" />
            </form>
        </div>
    );
};

export default Login;