import "bootstrap/dist/js/bootstrap.min.js";

interface Props {
    bmi: string;
}

function BMIDisplay({ bmi }: Props) {
    const bmiNumber = parseFloat(bmi);

    return (
        <div>
            <h2>Your BMI is {bmiNumber.toFixed(1)}</h2>
            <div className="bmi-scale-container">
                <div
                    id="underweight"
                    className="bmi-scale"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                    data-bs-title="Dismissible popover"
                    data-bs-content="And here's some amazing content. It's very engaging. Right?"
                ></div>
                <div id="healthy" className="bmi-scale"></div>
                <div id="overweight" className="bmi-scale"></div>
                <div id="obese" className="bmi-scale"></div>
            </div>
        </div>
    );
}

export default BMIDisplay;
