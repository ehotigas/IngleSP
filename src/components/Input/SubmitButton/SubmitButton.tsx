import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
    text: string,
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    style?: React.CSSProperties
    value?: string
}

export const SubmitButton = (
    {
        text,
        onClick,
        style,
        value
    }: SubmitButtonProps
) => {
    return (
        <button
            type="submit"
            className={styles.button}
            style={style}
            defaultValue={value}
            onClick={
                (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { onClick && onClick(event); }
            }
        >
            {text}
        </button>
    );
}