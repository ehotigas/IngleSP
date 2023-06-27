import styles from "./Input.module.css";

interface InputProps {
    fieldName: string
    type?: string
    style?: React.CSSProperties
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

export const Input = (
    {
        fieldName,
        type,
        style,
        value,
        onChange
    }: InputProps
) => {
    return (
        <input
            className={styles.input}
            placeholder={fieldName}
            style={style}
            type={type}
            defaultValue={value}
            onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                    onChange && onChange(event);
                }
            }
        />
    );
}