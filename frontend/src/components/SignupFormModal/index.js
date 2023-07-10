import React, { useState } from "react";
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



    const handleSubmit = (e) => {
        e.preventDefault();

        if (errors && Object.keys(errors).length > 0) {
            return ("fix the errors")
        }

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

    // Validation regex pattern for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation check for a valid email
    const isValidEmail = (email) => emailRegex.test(email);

    return (
        <>
            <div id="signupBox">
                <h1>Sign Up</h1>
                <form className="signupForm" onSubmit={handleSubmit}>
                    <label className="signuplabel">
                        <div className="label-errors">
                            Email
                            {errors.email && <p className="errors">{errors.email}</p>}

                        </div>
                        <input
                            className="input-area"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                let newEmail = e.target.value.trim()
                                if (!isValidEmail(newEmail)) {
                                    setErrors(prev => {
                                        let err = { ...prev }
                                        err.email = "Not a valid email"
                                        setDisabled(true)
                                        return err
                                    })
                                } else {
                                    setErrors(prev => {
                                        let err = { ...prev }
                                        delete err.email
                                        setDisabled(false)
                                        return err
                                    })
                                }
                                setEmail(newEmail)
                            }}
                            required
                        />
                    </label>

                    <label className="signuplabel">
                        <div className="label-errors">
                            Username
                            {errors.username && <p className="errors">{errors.username}</p>}
                        </div>
                        <input
                            className="input-area"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                let newUsername = e.target.value.trim()
                                if (!newUsername || newUsername.length < 4 || newUsername.length > 20) {
                                    setErrors(prev => {
                                        let err = { ...prev };
                                        err.username = "Not a valid username";
                                        setDisabled(true);
                                        return err;
                                    })
                                } else {
                                    setErrors(prev => {
                                        let err = { ...prev };
                                        delete err.username;
                                        setDisabled(false);
                                        return err;
                                    })
                                }
                                setUsername(newUsername)
                            }}
                            required
                        />
                    </label>

                    <label className="signuplabel">
                        <div className="label-errors">
                            First Name
                            {errors.firstName && <p className="errors">{errors.firstName}</p>}
                        </div>
                        <input
                            className="input-area"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>

                    <label className="signuplabel">
                        <div className="label-errors">
                            Last Name
                            {errors.lastName && <p className="errors">{errors.lastName}</p>}
                        </div>
                        <input
                            className="input-area"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>

                    <label className="signuplabel">
                        <div className="label-errors">
                            Password
                            {errors.password && <p className="errors">{errors.password}</p>}
                        </div>
                        <input
                            className="input-area"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                let password = e.target.value.trim();
                                if (!password || password.length < 5 || password.length > 20) {
                                    setErrors((prev) => {
                                        let err = { ...prev };
                                        err.password = "Not a valid password";
                                        setDisabled(true);
                                        return err;
                                    });
                                } else {
                                    setErrors((prev) => {
                                        let err = { ...prev };
                                        delete err.password;
                                        setDisabled(false);
                                        return err;
                                    });
                                }
                                setPassword(e.target.value);
                            }}
                            required
                        />
                    </label>

                    <label className="signuplabel">
                        <div className="label-errors">
                            Confirm Password
                            {errors.confirmPassword && (
                                <p className="errors">{errors.confirmPassword}</p>
                            )}
                        </div>
                        <input
                            className="input-area"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                let password2 = e.target.value.trim()
                                if (password2 !== password) {
                                    setErrors(prev => {
                                        let err = { ...prev }
                                        err.confirmPassword = "passwords don't match"
                                        setDisabled(true)
                                        return err
                                    })
                                } else {
                                    setErrors(prev => {
                                        let err = { ...prev }
                                        delete err.confirmPassword
                                        setDisabled(false)
                                        return err
                                    })
                                }
                                setConfirmPassword(e.target.value)
                            }}
                            required
                        />
                    </label>

                    <button disabled={disabled} id="signupbutton" className={disabled && "disabled"} type="submit">Sign Up</button>

                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
