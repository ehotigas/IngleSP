import { Container } from "@/components/Container/Container";
import { FillBlankQuestionAnswer, FillBlankSpaceQuestion } from "@/types/global"

interface FillBlankProps {
    question: FillBlankSpaceQuestion
    setAnswer: (id: number, value: string)=>void
}

export const FillBlank = (
    {
        question,
        setAnswer
    }: FillBlankProps
) => {
    const getAnswerArray = (): (string | number)[] => {
        const array: (string | number)[] = [''];
        for (let index = 1; index <= question.answers_fill_blank.length; index++) {
            array.push(index);
        }
        return array;
    }

    const handleChange = (
        answerId: number
    ) => (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setAnswer(answerId, event.target.value);
    }
    return (
        <Container
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
            <Container
                style={{
                    marginTop: "50px"
                }}
            >
                {
                    question.answers_fill_blank.map(
                        (answer: FillBlankQuestionAnswer, index: number) => {
                            return (
                                <Container
                                    key={`answer-container-${index}`}
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    {answer.answer_text}:
                                    <select
                                        onChange={handleChange(answer.id)}
                                        style={{
                                            marginLeft: "10px"
                                        }}
                                    >
                                        {
                                            getAnswerArray().map(
                                                (value: number | string, optionIndex) => {
                                                    return (
                                                        <option
                                                            key={`answer-${index}-option-${optionIndex}`}
                                                        >
                                                            {value}
                                                        </option>
                                                    )
                                                }
                                            )
                                        }
                                    </select> 
                                </Container>
                            );
                        }
                    )
                }
            </Container>
        </Container>
    );
}