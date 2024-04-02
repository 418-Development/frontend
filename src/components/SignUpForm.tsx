import { useRef, useState } from "react";

// Create an Interface Props to be able to take in username and password from the regular login page
interface Props {
    signin: (username: string, password: string) => void;
    username?: string;
    password?: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

function SignUpForm({ signin, setUsername, setPassword, username = "", password = "" }: Props) {
    const [email, setEmail] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    const emailValidation = useRef<HTMLDivElement>(null);
    const emailValidationInput = useRef<HTMLInputElement>(null);

    const usernameValidation = useRef<HTMLDivElement>(null);
    const usernameValidationInput = useRef<HTMLInputElement>(null);

    const passwordValidation = useRef<HTMLDivElement>(null);
    const passwordValidationInput = useRef<HTMLInputElement>(null);
    const closeButton = useRef<HTMLButtonElement>(null);

    // This const async function will check that both the password and verify password are the same. It will send the form to the backend should both be the same
    // Should they not be the same the user will be informed of the error and the form will not send anything to the backend but wait for new user input.
    const checkPassword = async () => {
        if (password == verifyPassword) {
            const success = await signup();
            if (success) {
                await signin(username, password);
                closeButton.current?.click();
            }
        } else if (passwordValidation.current != null) {
            passwordValidationInput.current?.classList.add("is-invalid");
            passwordValidation.current.textContent = "Passwords are not the same. Please try again.";
        }
    };

    // This const async function will send the signup info to the back end via a POST request to the corresponding web address
    const signup = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "api/auth/signup";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        });

        console.log("http://localhost:8080/api/auth/signup", response.ok, response.status);

        if (!response.ok) {
            const json = await response.json();

            console.log("json", json);
            const msg: string = json.message;
            if (msg.toLowerCase().includes("email")) {
                emailValidationInput.current?.classList.add("is-invalid");
                if (emailValidation.current) emailValidation.current.textContent = msg;
            } else {
                usernameValidationInput.current?.classList.add("is-invalid");
                if (usernameValidation.current) usernameValidation.current.textContent = msg;
            }
        }

        return response.ok;
    };

    // The return is the HTML structure required to display the modal dialog to the user.
    return (
        <div id="modalSignUpForm" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Sign Up Form</h5>
                        <button ref={closeButton} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();

                            checkPassword();
                        }}
                    >
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="userEmail">Email address</label>
                                <input
                                    ref={emailValidationInput}
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        emailValidationInput.current?.classList.remove("is-invalid");
                                    }}
                                    className="form-control"
                                    id="userEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                                <div className="invalid-feedback" ref={emailValidation}></div>
                                <small id="emailHelp" className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="Username">Username</label>
                                <input
                                    ref={usernameValidationInput}
                                    type="text"
                                    autoComplete="username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        usernameValidationInput.current?.classList.remove("is-invalid");
                                    }}
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                />
                                <div className="invalid-feedback" ref={usernameValidation}></div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="userPassword">Password</label>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="form-control"
                                    id="userPassword"
                                    placeholder="Password"
                                    value={password}
                                    min={6}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="verifyUserPassword">Verify User Password</label>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    ref={passwordValidationInput}
                                    onChange={(e) => {
                                        setVerifyPassword(e.target.value);
                                    }}
                                    className="form-control"
                                    id="verifyUserPassword"
                                    placeholder="Verify Password"
                                    min={6}
                                />
                                <div className="invalid-feedback" ref={passwordValidation}></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
