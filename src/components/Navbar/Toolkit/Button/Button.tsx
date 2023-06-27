import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
    text: string,
    to: string
}

export const Button = (
    {
        text,
        to
    }: ButtonProps
) => {
    return (
        <Link
            href={to}
        >
            <p
            className={styles.button}
            >
                {text}
            </p>
        </Link>
    );
}