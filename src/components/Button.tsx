import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    style?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
    type?: "button" | "submit";
    className?: string;
    onClick?: () => void;
}

function Button({ children, onClick, className = "", style = "primary", type = "button" }: Props) {
    return (
        <button type={type} className={`btn btn-${style} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
