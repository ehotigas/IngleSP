import styles from "./Label.module.css"

interface LabelProps {
    text: string
}

export const Label = (
    {
        text
    }: LabelProps
) => {
    return (
        <p
            className={styles.label}
        >
            {text}
        </p>
    )
}