import styles from "./Button.module.css";

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    style?: React.CSSProperties
    text: string
}

export const Button = (
    {
        onClick,
        style,
        text
    }: ButtonProps
) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    )
}