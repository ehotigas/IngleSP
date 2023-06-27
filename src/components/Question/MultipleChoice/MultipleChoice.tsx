import { Container } from "@/components/Container/Container";
import { MultipleChoiceAnswer, MultipleChoiceQuestion } from "@/types/global"
import { Answer } from "./Toolkit/Answer";

interface MultipleChoiceProps {
    question?: MultipleChoiceQuestion
    ref?: React.RefObject<HTMLDivElement>
    setAnswer?: (answerId: number)=>void
}


export const MultipleChoice = (
    {
        question,
        ref,
        setAnswer
    }: MultipleChoiceProps
) => {
    const handleClick = (
        id: number
    ) => () => {
        setAnswer && setAnswer(id);
    }
    return (
        <Container
            ref={ref}
            style={{
                width: "90%",
                fontSize: "18px"
            }}
        >
            <Container
                style={{
                    fontWeight: "bold",
                    marginTop: "30px"
                }}
            >
                {question?.question_text}
            </Container>
            <div
                style={{
                    marginTop: "70px"
                }}
            >
                {
                    question?.answers_multiple?.map(
                        (
                            answer: MultipleChoiceAnswer
                        ) => <Answer
                            checked={answer.userAnswer}
                            text={answer.answer_text}
                            onClick={handleClick(answer.id)}
                        />
                    )
                }
            </div>
        </Container>
    );
}