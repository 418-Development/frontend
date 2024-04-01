import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import "../index.css";
import BMIDisplay from "./BMIDisplay";

interface Props {
    signOut: () => void;
}

interface Userinfo {
    email: string;
    name: string;
    age: number;
    height: number;
    weight: number;
}

function BMICalculatorForm({ signOut }: Props) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [bmi, setBmi] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    /*
    useEffect(() => {
        getUserinfo();
    }, []);
    */

    const getUserinfo = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "userinfo";

        console.log("Request userinfo from", url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data", data);

            const userinfo = data as Userinfo;

            setUsername(userinfo.name);
            setEmail(userinfo.email);
            setAge(userinfo.age.toString());
            setWeight(userinfo.weight.toString());
            setHeight(userinfo.height.toString());
        } else if (response.status == 401) {
            // Sign out user, because the token is most likely expired.
            signOut();
        } else {
            console.log("Failed to get userinfo", response);
            setUsername("");
            setEmail("");
            setAge("");
            setWeight("");
            setHeight("");
        }
        setLoading(false);
    };

    const submitBMICalculatorForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = (import.meta.env.VITE_API_URL as string) + "api/test/calculate_bmi";

        console.log("Update userinfo at", url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
            body: JSON.stringify({
                username: username,
                age: parseInt(age),
                weight: parseFloat(weight),
                height: parseFloat(height),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data", data);
            setBmi(data.message);
        } else if (response.status == 401) {
            // Sign out user, because the token is most likely expired.
            signOut();
        } else {
            console.log("Failed to update userinfo", response);
            setBmi("");
        }
    };

    return (
        <>
            {loading ? (
                <div className="row mt-3">
                    <div className="col text-center">
                        <h2>Loading</h2>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <form
                    action=""
                    onSubmit={(e) => {
                        submitBMICalculatorForm(e);
                    }}
                >
                    <div className="input-group mb-3 bg-secondary rounded">
                        <span className="input-group-text bg-dark text-white">Username</span>
                        <input
                            type="text"
                            name="name"
                            autoComplete="username"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Your Name"
                            required
                            min="2"
                            max="35"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="input-group mb-3 bg-secondary rounded">
                        <span className="input-group-text bg-dark text-white">Age</span>
                        <input
                            type="number"
                            name="age"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Age"
                            required
                            min="0"
                            max="120"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 bg-secondary rounded">
                        <span className="input-group-text bg-dark text-white">Weight (kg)</span>
                        <input
                            type="number"
                            name="weight"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Weight in kilograms"
                            required
                            min="0"
                            step="0.01"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 bg-secondary rounded">
                        <span className="input-group-text bg-dark text-white">Height (cm)</span>
                        <input
                            type="number"
                            name="height"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Height in centimeters"
                            required
                            min="0"
                            step="0.01"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type="submit">Calculate BMI</Button>
                    </div>
                </form>
            )}
            {bmi !== "" ? <BMIDisplay bmi={bmi} /> : <></>}
        </>
    );
}

export default BMICalculatorForm;
