import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import BMICalculatorWelcome from "./components/BMICalculatorWelcome";
import BMICalculatorForm from "./components/InputForm";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (document.cookie.startsWith("token=")) {
            setIsAuthenticated(true);
        }
    }, []);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const login = async (email: string, password: string) => {
        console.log("login", email, password);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            const token = await user.getIdToken();

            const date = new Date();
            date.setTime(date.getTime() + 15 * 60 * 1000);
            document.cookie = `token=${token};expires="${date.toUTCString()};SameSite=Strict;path=/`;
            setIsAuthenticated(true);
        } catch (error) {
            console.log("SignUp error", error);
        }
    };

    const signUp = async (email: string, password: string) => {
        console.log("signUp", email, password);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            const token = await user.getIdToken();

            const date = new Date();
            date.setTime(date.getTime() + 5 * 60 * 1000);
            document.cookie = `token=${token};expires="${date.toUTCString()};SameSite=Strict;path=/`;
            setIsAuthenticated(true);
        } catch (error) {
            console.log("SignUp error", error);
        }
    };

    const signOut = async () => {
        console.log("signOut");
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setIsAuthenticated(false);
    };

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navigation
                                activeNavigationItem={NavigationItem.HOME}
                                isAuthenticated={isAuthenticated}
                                onLogin={login}
                                onSignUp={signUp}
                                onSignOut={signOut}
                            />
                            <div className="container mt-3">
                                {isAuthenticated ? <BMICalculatorForm signOut={signOut} /> : <BMICalculatorWelcome />}
                            </div>
                        </>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
