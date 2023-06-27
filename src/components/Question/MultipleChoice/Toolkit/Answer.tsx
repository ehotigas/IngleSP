import { Container } from "@/components/Container/Container";
import styles from "./Answer.module.css"

interface AnswerProps {
    checked: boolean
    onClick?: React.MouseEventHandler<HTMLInputElement>
    text: string
}

export const Answer = (
    {
        checked,
        onClick,
        text
    }: AnswerProps
) => {
    return (
        <Container
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