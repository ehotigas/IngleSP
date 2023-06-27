import { Container } from "@/components/Container/Container";
import styles from "./Answer.module.css"

interface AnswerProps {
    checked: boolean
    key?: React.Key
    onClick?: React.MouseEventHandler<HTMLInputElement>
    text: string
}

export const Answer = (
    {
        checked,
        key,
        onClick,
        text
    }: AnswerProps
) => {
    return (
        <Container
            key={key}
            style={{
                height: "30px"
            }}
        >
            <input 
                className={styles.check}
                checked={checked}
                onClick={onClick}
                type="checkbox"
            />{text}
        </Container>
    );
}