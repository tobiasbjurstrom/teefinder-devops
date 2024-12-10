import React from 'react';
import '../index.css'; // Corrected path to the stylesheet

const LoginView = ({ username, password, onUsernameChange, onPasswordChange, onSubmit, errorMessage }) => {
    return (
        <div className="login-container">
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => onUsernameChange(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginView;
