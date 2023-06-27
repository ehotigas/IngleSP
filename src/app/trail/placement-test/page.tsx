"use client"

import { Container } from "@/components/Container/Container";
import { QuestionContainer } from "@/components/Container/QuestionContainer/QuestionContainer";
import { Button } from "@/components/PlacementTest/Button/Button";
import { MultipleChoice } from "@/components/Question/MultipleChoice/MultipleChoice";
import { MultipleChoiceAnswer, MultipleChoiceQuestion, PlacementTest as PlacementTestType, QuestionCategory, User } from "@/types/global";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface PageAttributes {
    seconds: number
    questionId: number
}

const formatNumber = (
    number: number
): string => {
    if (number < 10)
        return `0${number}`;
    return `${number}`;
}

const formatTime = (
    seconds: number
): string => {
    const hour = Math.trunc(seconds / 3600);
    let tempSeconds = seconds % 3600;
    const minutes = Math.trunc(tempSeconds / 60);
    tempSeconds = seconds % 60;
    return hour > 0 ? `${formatNumber(hour)}:${formatNumber(minutes)}:${formatNumber(tempSeconds)}` :
        `${formatNumber(minutes)}:${formatNumber(tempSeconds)}`;
}

const setQuestions = (
    data: PlacementTestType
): PlacementTestType => {
    for (let questionIndex = 0; questionIndex < data.multiple_choice_questions.length; questionIndex++) {
        for (let answerIndex = 0; answerIndex < data.multiple_choice_questions[questionIndex].answers_multiple.length; answerIndex++) {
            data.multiple_choice_questions[questionIndex].answers_multiple[answerIndex].userAnswer = false;
        }
    }
    return data;
}

interface Answers {
    question_id: number
    answer_id: number
    question_type: string
}

const getAnswerArray = (
    placement: PlacementTestType
): Answers[] => {
    const answers: Answers[] = [];
    placement.multiple_choice_questions.forEach(
        (question: MultipleChoiceQuestion) => {
            const addAnswer = { question_id: question.id, answer_id: 0, question_type: "multiple_choice" };
            question.answers_multiple.forEach(
                (answer: MultipleChoiceAnswer) => {
                    if (answer.userAnswer) {
                        addAnswer.answer_id = answer.id
                    }
                }
            );
            answers.push(addAnswer);
        }
    )
    return answers;
}

const calculateScore = (
    placement: PlacementTestType
): string => {
    let score = 0;
    placement.multiple_choice_questions.forEach(
        (question: MultipleChoiceQuestion) => {
            question.answers_multiple.forEach(
                (answer: MultipleChoiceAnswer) => {
                    if (answer.userAnswer && answer.is_correct) {
                        score++;
                    }
                }
            );
        }
    )
    return `${score}-${placement.multiple_choice_questions.length}`;
}

const PlacementTest = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [placementTest, setPlacementTest] = useState<PlacementTestType>();
    const [pageAttributes, setPageAttributes] = useState<PageAttributes>({
        seconds: 0,
        questionId: 0
    });
    const { data: session } = useSession();
    const user: User | undefined = session?.user;
    const router = useRouter();

    const setSeconds = (
        seconds: number
    ) => setPageAttributes({ ...pageAttributes, seconds: seconds });

    useEffect(() => {
        const getData = async () => {
            const res = await Promise.resolve(
                fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/placement-tests/get-placement")
            );
            const data = await res.json();
            setPlacementTest(setQuestions(data[0]));
        }
        getData();
    }, []);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSeconds(pageAttributes.seconds + 1);
        }, 1000);

        return () => clearTimeout(timeOut);
    }, [pageAttributes]);

    const setAnswer = (
        answerId: number
    ) => {
        if (placementTest) {
            const tempPlacementTest = { ...placementTest };
            for (
                let answerIndex = 0;
                answerIndex < tempPlacementTest.multiple_choice_questions[pageAttributes.questionId].answers_multiple.length;
                answerIndex++
            ) {
                if (tempPlacementTest.multiple_choice_questions[pageAttributes.questionId].answers_multiple[answerIndex].id === answerId) {
                    tempPlacementTest.multiple_choice_questions[pageAttributes.questionId].answers_multiple[answerIndex].userAnswer =
                    tempPlacementTest.multiple_choice_questions[pageAttributes.questionId].answers_multiple[answerIndex].userAnswer ? false : true;
                } else {
                    tempPlacementTest.multiple_choice_questions[pageAttributes.questionId].answers_multiple[answerIndex].userAnswer = false;
                }
            }
            setPlacementTest(tempPlacementTest);
        }
    }

    return (
        <QuestionContainer
            title={`Question ${pageAttributes.questionId + 1}`}
            time={formatTime(pageAttributes.seconds)}
        >
            <MultipleChoice
                question={
                    placementTest?.multiple_choice_questions ?
                        placementTest.multiple_choice_questions[pageAttributes.questionId] :
                        {
                            id: 0,
                            title: "",
                            category: {  } as QuestionCategory,
                            question_text: "",
                            answers_multiple: []
                        }
                }
                ref={ref}
                setAnswer={setAnswer}
            />
            <Container
                style={{
                    marginTop: "50px"
                }}
            >
                {
                    pageAttributes.questionId !== 0 &&
                    <Button
                        onClick={
                            () => {
                                setPageAttributes({ ...pageAttributes, questionId: pageAttributes.questionId - 1 })
                            }
                        }
                        style={{
                            float: "left",
                            marginLeft: "calc(50% - 170px)",
                            marginTop: `50px`,
                            marginBottom: `20px`
                        }}
                        text="PREVIUS"
                    />
                }
                {
                    placementTest && pageAttributes.questionId === placementTest?.multiple_choice_questions.length - 1 ?
                    <Button
                        onClick={
                            () => {
                                console.log(JSON.stringify({
                                    user: user?.id,
                                    placement: placementTest.id,
                                    user_response: getAnswerArray(placementTest),
                                    time_taken: pageAttributes.seconds
                                }))
                                fetch(
                                    "http://ec2-3-95-171-50.compute-1.amazonaws.com/final-tests/user-result",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            user: user?.id,
                                            placement: placementTest.id,
                                            user_response: getAnswerArray(placementTest),
                                            time_taken: pageAttributes.seconds
                                        })
                                    }
                                ).then(
                                    (res: Response) => {
                                        if (res.ok) {
                                            router.push(`/trail/placement-test/user-results?score=${calculateScore(placementTest)}&time=${pageAttributes.seconds}`)
                                        }
                                    }
                                )
                            }
                        }
                        style={{
                            float: "right",
                            marginRight: "calc(50% - 170px)",
                            marginTop: `50px`,
                            marginBottom: `20px`
                        }}
                        text="SEND"
                    /> :
                    <Button
                        onClick={
                            () => {
                                setPageAttributes({ ...pageAttributes, questionId: pageAttributes.questionId + 1 })
                            }
                        }
                        style={{
                            float: "right",
                            marginRight: "calc(50% - 170px)",
                            marginTop: `50px`,
                            marginBottom: `20px`
                        }}
                        text="NEXT"
                    />
                }
            </Container>
        </QuestionContainer>
    );
}

export default PlacementTest;