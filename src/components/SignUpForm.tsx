import { useRef, useState } from "react";
import Button from "./Button";

interface Props {
    username?: string,
    password?: string
}

function SignUpForm({username = "", password = ""}: Props) {
    const [email, setEmail] = useState<string>("");
    const [usernameInput, setUsername] = useState<string>("");
    const [passwordInput, setPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    const passwordValidation = useRef<HTMLDivElement>(null)

    const checkPassword = async () => {
        if (passwordInput == verifyPassword) {
            signup()
        }
        else if (passwordValidation.current != null) {
            passwordValidation.current.textContent = "Passwords are not the same. Please try again."
        }
    }

    const signup = async () => {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                username: usernameInput,
                password: passwordInput,
            }),
        });
    
        console.log("http://localhost:8080/api/auth/signup", response.ok, response.status);
    
        const json = await response.json();
    
        console.log("json", json);
    }

    return (
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <form action=""
                    onSubmit={() => {
                        checkPassword();
                    }}
            >
                <div className="form-group">
                    <label htmlFor="usereEmail">Email address</label>
                    <input type="email" onChange={(e) => {setEmail(e.target.value)}} className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Username">Username</label>
                    <input type="text" onChange={(e) => {setUsername(e.target.value)}} className="form-control" id="username" placeholder="Username" value={username}/>
                </div>
                <div className="form-group">
                    <label htmlFor="userPassword">Password</label>
                    <input type="password" onChange={(e) => {setPassword(e.target.value)}} className="form-control" id="userPassword" placeholder="Password" value={password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="verifyUserPassword">Verify User Password</label>
                    <input type="password" onChange={(e) => {setVerifyPassword(e.target.value)}} className="form-control" id="verifyUserPassword" placeholder="Verify Password"/>
                    <div className="invalid-feedback" ref={passwordValidation}></div>
                </div>
                <Button type="submit" className="btn btn-primary">Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm