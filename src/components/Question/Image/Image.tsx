import { Container } from "@/components/Container/Container";
import { AnswerImageText, ImageQuestion, ImageQuestionAnswerImage } from "@/types/global";
import styles from "./Image.module.css"

interface ImageProps {
    question: ImageQuestion
    setAnswer: (id: number, value: string)=>void
}

export const Image = (
    {
        question,
        setAnswer
    }: ImageProps
) => {
    const handleChangeInput = (
        imageId: number
    ) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAnswer(imageId, event.target.value);
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
                    marginTop: "50px",
                    width: "80%",
                    marginLeft: "10%",
                    textAlign: "center"
                }}
            >
                {
                    question.answers_image_text.map(
                        (answer: AnswerImageText, index: number) => {
                            return (
                                <p
                                    className={styles.text}
                                    key={`question-text-${index}`}
                                >
                                    {`${answer.num_id} - ${answer.answer_text}`}
                                </p>
                            );
                        }
                    )
                }
            </Container>

            <Container
                style={{
                    marginTop: "20px",
                    width: "50%",
                }}
            >
                {
                    question.images_questions.map(
                        (image: ImageQuestionAnswerImage, index: number) => {
                            return (
                                <Container
                                    key={`answer-container-${index}`}
                                    style={{
                                        width: "50%",
                                        float: "left",
                                        alignItems: "center",
                                        textAlign: "center",
                                        marginTop: "50px"
                                    }}
                                >
                                    <Container
                                        style={{
                                            backgroundColor: "#76DCC2",
                                            width: "220px",
                                            height: "250px"
                                        }}
                                    >
                                        <img
                                            key={`image-${index}`}
                                            src={`data:image/png;base64,${image.image}`}
                                            width={200}
                                            height={200}
                                            style={{ border: "solid 1px #000", marginTop: "10px" }}
                                        />
                                        <Container>
                                            <input
                                                className={styles.inputNumber}
                                                key={`question-input-${index}`}
                                                onChange={handleChangeInput(image.id)}
                                                type="number"
                                                value={image.userAnswer}
                                            />
                                        </Container>
                                    </Container>
                                </Container>
                            )
                        }
                    )
                }
            </Container>
        </Container>
    )
}