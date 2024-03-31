import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from './firebase'; // Ensure this path is correct

export default function StudentDashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate(); // Use navigate hook for redirection after login

    const onCaptchaChange = (value) => {
        console.log("Captcha value:", value);
        setCaptchaValue(value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert("Please solve the CAPTCHA to confirm you are not a robot.");
            return;
        }

        try {
            await loginWithEmailAndPassword(email, password);
            // Redirect to another page after successful login, or handle login success here
            navigate('/path-to-redirect-after-successful-login'); // Adjust this path as necessary
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div className="form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <ReCAPTCHA
                    sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your actual ReCAPTCHA site key
                    onChange={onCaptchaChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
