import styles from "./Button.module.css"

interface ButtonProps {
    text: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    style?: React.CSSProperties
}

export const Button = (
    {
        text,
        onClick,
        style
    }: ButtonProps
) => {
    return (
        <button
            className={styles.button}
            style={style}
            onClick={
                (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    onClick && onClick(event);
                }
            }
        >
            {text}
        </button>
    );
}