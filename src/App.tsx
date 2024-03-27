import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import BMICalculatorWelcome from "./components/BMICalculatorWelcome";
import BMICalculatorForm from "./components/InputForm";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyBdsifyEDlciw050s-mGrkzpcTlgd8LnN0",
        authDomain: "thematic-caster-377812.firebaseapp.com",
        projectId: "thematic-caster-377812",
        storageBucket: "thematic-caster-377812.appspot.com",
        messagingSenderId: "586712562246",
        appId: "1:586712562246:web:ceff049ab7d012dcbe2847",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const login = async (email: string, password: string) => {
        console.log("login", email, password);
        setIsAuthenticated(true);
    };

    const signUp = async (email: string, password: string) => {
        console.log("signUp", email, password);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            const token = await user.getIdToken();

            document.cookie = `token=${token};path=/;SameSite=Strict`;
            setIsAuthenticated(true);
        } catch (error) {
            console.log("SignUp error", error);
        }
    };

    const signOut = async () => {
        console.log("signOut");
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
                            <div className="container">
                                <BMICalculatorWelcome />
                                <BMICalculatorForm />
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
