

function BMICalculatorForm() {
    // Placeholder function for form submission
    //   const handleSubmit = (e) => {
    //       e.preventDefault();
    // Here, you would typically gather form data and process it
    //      console.log('Submit BMI data');
    //    };

    return (
        <form method="post" action="/submit-bmi-data">
            <div className="input-group mb-3 bg-secondary rounded">
                <span className="input-group-text bg-dark text-white">Name</span>
                <input type="text" name="name" className="form-control bg-dark text-white border-secondary" placeholder="Your Name" required min="2" max="35" />
            </div>
            <div className="input-group mb-3 bg-secondary rounded">
                <span className="input-group-text bg-dark text-white">Age</span>
                <input type="number" name="age" className="form-control bg-dark text-white border-secondary" placeholder="Age" required min="0" max="120" />
            </div>
            <div className="input-group mb-3 bg-secondary rounded">
                <span className="input-group-text bg-dark text-white">Weight (kg)</span>
                <input type="number" name="weight" className="form-control bg-dark text-white border-secondary" placeholder="Weight in kilograms" required min="0" />
            </div>
            <div className="input-group mb-3 bg-secondary rounded">
                <span className="input-group-text bg-dark text-white">Height (cm)</span>
                <input type="number" name="height" className="form-control bg-dark text-white border-secondary" placeholder="Height in centimeters" required min="0" />
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-outline-primary">Calculate BMI</button>
            </div>
        </form>
    );
}

export default BMICalculatorForm;
