import { useRef, useState } from "react";
import Button from "./Button";

interface Props {
    username?: string,
    password?: string
}

function SignUpForm({username = "", password = ""}: Props) {
    const [email, setEmail] = useState<string>("");
    const [usernameInput, setUsername] = useState<string>(username);
    const [passwordInput, setPassword] = useState<string>(password);
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    const passwordValidation = useRef<HTMLDivElement>(null)
    const passwordValidationInput = useRef<HTMLInputElement>(null)

    const checkPassword = async () => {
        if (passwordInput == verifyPassword) {
            signup()
        }
        else if (passwordValidation.current != null) {
            passwordValidationInput.current?.classList.add("is-invalid")
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
        <div id="modalSignUpForm" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Sign Up Form</h5>
                    </div>
                    <div className="modal-body">
                        <form action=""
                            onSubmit={(e) => {
                                e.preventDefault();

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
                                <input type="text" onChange={(e) => {setUsername(e.target.value)}} className="form-control" id="username" placeholder="Username" value={usernameInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPassword">Password</label>
                                <input type="password" onChange={(e) => {setPassword(e.target.value)}} className="form-control" id="userPassword" placeholder="Password" value={passwordInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="verifyUserPassword">Verify User Password</label>
                                <input type="password" ref={passwordValidationInput} onChange={(e) => {setVerifyPassword(e.target.value)}} className="form-control" id="verifyUserPassword" placeholder="Verify Password"/>
                                <div className="invalid-feedback" ref={passwordValidation}></div>
                            </div>
                            <Button type="submit" className="btn btn-primary">Submit</Button>
                        </form>
                    </div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </div>
        
    )
}

export default SignUpForm