import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import styles from "./styles.module.css";

function Signup() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');
    const [error, setError] = useState(''); // Optional: Error state

    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.message === 'Success') { // Assuming a success message
                        alert('Signup Successful'); // Handle success
                    } else {
                        setError(res.data.message); // Display any other message as an error
                    }
                }
            })
            .catch((err) => {
                setError('SERVER ERROR'); // More descriptive error message
            });
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={(e) => e.preventDefault()}>
                        <h2>Welcome to Signup Page</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Mobile"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="button" className={styles.green_btn} onClick={handleApi}>
                            SIGNUP
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h2>Already Registered?</h2>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            LOGIN
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
