import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (!email || !username || !firstName || !lastName || !password || !confirmPassword) {
            setDisabled(true)
            return;
        }
        if (username.length < 4) {
            setDisabled(true);
            return;
        }
        if (password.length < 6) {
            setDisabled(true);
            return;
        }
        setDisabled(false)
    }, [email, username, firstName, lastName, password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <>
            <div id="signupBox">
                <h1>Sign Up</h1>
                <form className="signupForm" onSubmit={handleSubmit}>
                    <label className="signuplabel">
                        Email
                        <input
                            className="input-area"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    {errors.email && <p>{errors.email}</p>}
                    <label className="signuplabel">
                        Username
                        <input
                            className="input-area"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
                    <label className="signuplabel">
                        First Name
                        <input
                            className="input-area"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    {errors.firstName && <p>{errors.firstName}</p>}
                    <label className="signuplabel">
                        Last Name
                        <input
                            className="input-area"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    {errors.lastName && <p>{errors.lastName}</p>}
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
                    {errors.password && <p>{errors.password}</p>}
                    <label className="signuplabel">
                        Confirm Password
                        <input
                            className="input-area"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword}</p>
                    )}
                    <button disabled={disabled} id="signupbutton" type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
