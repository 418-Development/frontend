import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    style?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
    outline?: boolean;
    type?: "button" | "submit";
    className?: string;
    onClick?: () => void;
}

function Button({ children, onClick, className = "", style = "primary", outline = false, type = "button" }: Props) {
    return (
        <button type={type} className={`btn btn-${outline ? "outline-" : ""}${style} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
