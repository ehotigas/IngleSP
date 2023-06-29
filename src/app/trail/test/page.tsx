"use client"

import { QuestionContainer } from "@/components/Container/QuestionContainer/QuestionContainer";
import { Button } from "@/components/PlacementTest/Button/Button";
import { FillBlank } from "@/components/Question/FillBlank/FillBlank";
import { Image } from "@/components/Question/Image/Image";
import { MultipleChoice } from "@/components/Question/MultipleChoice/MultipleChoice";
import { FillBlankQuestionAnswer, FillBlankSpaceQuestion, ImageQuestion, ImageQuestionAnswerImage, MultipleChoiceAnswer, MultipleChoiceQuestion, Question, QuestionCategory, TrailTest, User } from "@/types/global";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum QuestionType {
    MULTIPLE_CHOICE_QUESTION="multiple_choice",
    FILL_BLANK_SPACE_QUESTION="fill_blank",
    IMAGE_QUESTION="image_text"
}

interface PageAttributes {
    seconds: number
    questionId: number
}

interface ImageAnswer {
    text_id: number
    answer_number: number
}

interface FillBlankAnswer {
    blank_index: number
    answer_text: string
}

interface Answers {
    question_id: number
    answer_id?: number
    answer?: ImageAnswer[] | FillBlankAnswer[]
    question_type: string
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

const getAnswerArray = (
    questions: Question[]
): Answers[] => {
    const answers: Answers[] = [];
    questions.forEach(
        (question: Question) => {
            const addAnswer: Answers = { question_id: question.question.id, question_type: question.type }
            if (question.type === QuestionType.MULTIPLE_CHOICE_QUESTION) {
                const multipleChoiceQuestion = question.question as MultipleChoiceQuestion;
                let id = 0;
                multipleChoiceQuestion.answers_multiple.forEach(
                    (answer: MultipleChoiceAnswer) => {
                        if (answer.userAnswer) {
                            id = answer.id
                        }
                    }
                );
                addAnswer.answer_id = id;
            }
            else if (question.type === QuestionType.IMAGE_QUESTION) {
                const imageQuesiton = question.question as ImageQuestion;
                const answerArray: ImageAnswer[] = [];
                imageQuesiton.images_questions.forEach(
                    (image: ImageQuestionAnswerImage) => {
                        answerArray.push({
                            text_id: parseInt(image.userAnswer),
                            answer_number: image.num_id
                        })
                    }
                )
                addAnswer.answer = answerArray;
            }
            else {
                const fillBlankQuestion = question.question as FillBlankSpaceQuestion;
                const answerArray: FillBlankAnswer[] = [];
                fillBlankQuestion.answers_fill_blank.forEach(
                    (value: FillBlankQuestionAnswer) => {
                        answerArray.push({
                            blank_index: value.blank_index,
                            answer_text: value.answer_text
                        });
                    }
                );
                addAnswer.answer = answerArray;
            }
            answers.push(addAnswer);
        }
    )
    return answers;
}

const instanceQuestionArray = (
    questionArray: (MultipleChoiceQuestion | ImageQuestion | FillBlankSpaceQuestion)[],
    questionType: QuestionType
): Question[] => {
    const arr: Question[] = [];
    questionArray.forEach(
        (question) => arr.push(
            {
                question: question,
                type: questionType
            }
        )
    );
    return arr;
}


const setMultipleChoiceQuestionsAnswer = (
    data: MultipleChoiceQuestion[]
): MultipleChoiceQuestion[] => {
    for (let questionIndex = 0; questionIndex < data.length; questionIndex++) {
        for (let answerIndex = 0; answerIndex < data[questionIndex].answers_multiple.length; answerIndex++) {
            data[questionIndex].answers_multiple[answerIndex].userAnswer = false;
        }
    }
    return data;
}

const setImageQuestionsAnswer = (
    data: ImageQuestion[]
): ImageQuestion[] => {
    for (let questionIndex = 0; questionIndex < data.length; questionIndex++) {
        for (let answerIndex = 0; answerIndex < data[questionIndex].images_questions.length; answerIndex++) {
            data[questionIndex].images_questions[answerIndex].userAnswer = "";
        }
    }
    return data;
}


const setFillBlankQuestionsAnswer = (
    data: FillBlankSpaceQuestion[]
): FillBlankSpaceQuestion[] => {
    for (let questionIndex = 0; questionIndex < data.length; questionIndex++) {
        for (let answerIndex = 0; answerIndex < data[questionIndex].answers_fill_blank.length; answerIndex++) {
            data[questionIndex].answers_fill_blank[answerIndex].userAnswer = "";
        }
    }
    return data;
}


const Test: NextPage = () => {
    const [questionArray, setQuestionArray] = useState<Question[]>([]);
    const [trail, setTrail] = useState<TrailTest>();
    const [pageAttributes, setPageAttributes] = useState<PageAttributes>({
        seconds: 0,
        questionId: 0
    });
    const router = useRouter();
    const { data: session } = useSession();
    const user: User | undefined = session?.user;

    const setAttribute = (
        pageAttribute: keyof PageAttributes,
        value: typeof pageAttributes[keyof PageAttributes]
    ) => {
        setPageAttributes({ ...pageAttributes, [pageAttribute]: value });
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setAttribute('seconds', pageAttributes.seconds + 1);
        }, 1000);

        return () => clearTimeout(timeOut);
    }, [pageAttributes]);

    useEffect(() => {
        const getTrail = async () => {
            const req = await Promise.resolve(
                fetch("https://ingle-sp.vercel.app/api/trail-test")
            );
            const data: TrailTest[] = await req.json();
            if (data.length > 0) {
                setTrail(data[0]);
                setQuestionArray(
                    [
                        ...instanceQuestionArray(setMultipleChoiceQuestionsAnswer(data[0].multiple_choice_questions), QuestionType.MULTIPLE_CHOICE_QUESTION),
                        ...instanceQuestionArray(setImageQuestionsAnswer(data[0].image_text_questions), QuestionType.IMAGE_QUESTION),
                        ...instanceQuestionArray(setFillBlankQuestionsAnswer(data[0].fill_blank_questions), QuestionType.FILL_BLANK_SPACE_QUESTION)
                    ]
                );
            }
        }
        getTrail();
    }, []);


    const setMultipleChoiceAnswer = (
        answerId: number
    ) => {
        if (questionArray) {
            const tempQuestionArray = [ ...questionArray ];
            const question = tempQuestionArray[pageAttributes.questionId].question as MultipleChoiceQuestion;
            for (
                let answerIndex = 0;
                answerIndex < question.answers_multiple.length;
                answerIndex++
            ) {
                if (
                    (tempQuestionArray[pageAttributes.questionId].question as MultipleChoiceQuestion).answers_multiple[answerIndex].id === answerId) {
                    (tempQuestionArray[pageAttributes.questionId].question as MultipleChoiceQuestion).answers_multiple[answerIndex].userAnswer =
                    (tempQuestionArray[pageAttributes.questionId].question as MultipleChoiceQuestion).answers_multiple[answerIndex].userAnswer ? false : true;
                } else {
                    (tempQuestionArray[pageAttributes.questionId].question as MultipleChoiceQuestion).answers_multiple[answerIndex].userAnswer = false;
                }
            }
            setQuestionArray(tempQuestionArray);
        }
    }

    const setImageAnswer = (
        answerId: number,
        value: string
    ) => {
        if (questionArray) {
            const tempQuestionArray = [ ...questionArray ];
            const question = tempQuestionArray[pageAttributes.questionId].question as ImageQuestion;
            for (
                let answerIndex = 0;
                answerIndex < question.images_questions.length;
                answerIndex++
            ) {
                if (
                    (tempQuestionArray[pageAttributes.questionId].question as ImageQuestion).images_questions[answerIndex].id === answerId) {
                    (tempQuestionArray[pageAttributes.questionId].question as ImageQuestion).images_questions[answerIndex].userAnswer = value;
                }
            }
            setQuestionArray(tempQuestionArray);
        }
    }

    const setFillBlankAnswer = (
        answerId: number,
        value: string
    ) => {
        if (questionArray) {
            const tempQuestionArray = [ ...questionArray ];
            const question = tempQuestionArray[pageAttributes.questionId].question as FillBlankSpaceQuestion;
            for (
                let answerIndex = 0;
                answerIndex < question.answers_fill_blank.length;
                answerIndex++
            ) {
                if (
                    (tempQuestionArray[pageAttributes.questionId].question as FillBlankSpaceQuestion).answers_fill_blank[answerIndex].id === answerId) {
                    (tempQuestionArray[pageAttributes.questionId].question as FillBlankSpaceQuestion).answers_fill_blank[answerIndex].userAnswer = value;
                }
            }
            setQuestionArray(tempQuestionArray);
        }
    }
    
    return (
        <QuestionContainer
            time={formatTime(pageAttributes.seconds)}
            title={`Question ${pageAttributes.questionId + 1}`}
        >
            {
                questionArray[pageAttributes.questionId] &&
                questionArray[pageAttributes.questionId].type === QuestionType.MULTIPLE_CHOICE_QUESTION ?
                <MultipleChoice
                    question={
                        questionArray ?
                        questionArray[pageAttributes.questionId].question as MultipleChoiceQuestion :
                            {
                                id: 0,
                                title: "",
                                category: {  } as QuestionCategory,
                                question_text: "",
                                answers_multiple: []
                            }
                    }
                    setAnswer={setMultipleChoiceAnswer}
                /> : questionArray[pageAttributes.questionId] && questionArray[pageAttributes.questionId].type === QuestionType.FILL_BLANK_SPACE_QUESTION ?
                <FillBlank
                    question={
                        questionArray ?
                        questionArray[pageAttributes.questionId].question as FillBlankSpaceQuestion :
                            {
                                id: 0,
                                title: "",
                                category: {  } as QuestionCategory,
                                question_text: "",
                                answers_fill_blank: []
                            }
                    }
                    setAnswer={setFillBlankAnswer}
                /> : questionArray[pageAttributes.questionId] ?
                <Image
                    question={
                        questionArray ?
                        questionArray[pageAttributes.questionId].question as ImageQuestion :
                            {
                                id: 0,
                                title: "",
                                category: {  } as QuestionCategory,
                                question_text: "",
                                answers_image_text: [],
                                images_questions: [],
                            }
                        }
                    setAnswer={setImageAnswer}
                /> :
                <></>
            }

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
                    questionArray && pageAttributes.questionId === questionArray.length - 1 ?
                    <Button
                        onClick={
                            () => {
                                console.log(getAnswerArray(questionArray));
                                fetch(
                                    "https://ingle-sp.vercel.app/api/trail-test",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            user: user?.id,
                                            trail: trail?.id,
                                            user_response: getAnswerArray(questionArray),
                                        })
                                    }
                                ).then(
                                    (res: Response) => {
                                        if (res.ok) {
                                            router.push(`/trail/test/user-results`)
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
        </QuestionContainer>
    );
}

export default Test;