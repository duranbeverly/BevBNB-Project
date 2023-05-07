// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <>

            <div id="signupBox">
                <h1>Log In</h1>
                <form className="signupForm" onSubmit={handleSubmit}>
                    <label className="signuplabel">
                        Username or Email
                        <input
                            className="input-area"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label className="signuplabel">
                        Password
                        <input
                            className="input-area"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.credential && (
                        <p>{errors.credential}</p>
                    )}
                    <button id="signupbutton" type="submit">Log In</button>
                </form>
            </div>
        </>
    );
}

export default LoginFormModal;
