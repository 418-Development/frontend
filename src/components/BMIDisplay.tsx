import "bootstrap/dist/js/bootstrap.min.js";

interface Props {
    bmi: string;
}

function BMIDisplay({ bmi }: Props) {
    const bmiNumber = parseFloat(bmi);

    // the scale starts at 15 and ends at 30
    let bmiScalePosition = (bmiNumber - 15) * (100 / 30);
    bmiScalePosition = Math.max(0, Math.min(100, bmiScalePosition));

    return (
        <div>
            <h2>Your BMI is {bmiNumber.toFixed(1)}</h2>
            <div className="bmi-scale-container mt-5">
                <div id="underweight" className="bmi-scale bg-info" title="underweight">
                    <span className="description">18.5</span>
                </div>
                <div id="healthy" className="bmi-scale bg-success" title="healthy">
                    <span className="description">25</span>
                </div>
                <div id="overweight" className="bmi-scale bg-warning" title="overweight">
                    <span className="description">30</span>
                </div>
                <div id="obese" className="bmi-scale bg-danger" title="obese"></div>
                <span id="bmi-indicator" style={{ left: `${bmiScalePosition}%` }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        className="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </span>
            </div>

            <ul className="list-group mt-5">
                <li className="list-group-item">
                    <span className="badge text-bg-info me-2">{"<18.5"}</span>underweight
                </li>
                <li className="list-group-item">
                    <span className="badge text-bg-success me-2">{"18.5-25"}</span>healthy
                </li>
                <li className="list-group-item">
                    <span className="badge text-bg-warning me-2">{"25-30"}</span>overweight
                </li>
                <li className="list-group-item">
                    <span className="badge text-bg-danger me-2">{">30"}</span>obese
                </li>
            </ul>
        </div>
    );
}

export default BMIDisplay;
