import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import BMICalculatorWelcome from "./components/BMICalculatorWelcome";
import BMICalculatorForm from "./components/InputForm";
import Users from "./routes/users";



function App() {

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navigation activeNavigationItem={NavigationItem.HOME} />
                            <BMICalculatorWelcome />
                            <BMICalculatorForm />
                        </>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <>
                            <Navigation activeNavigationItem={NavigationItem.USERS} />
                            <Users />
                        </>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
