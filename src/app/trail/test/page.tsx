"use client"

import { Container } from "@/components/Container/Container";
import { QuestionContainer } from "@/components/Container/QuestionContainer/QuestionContainer";
import { FillBlankSpaceQuestion, ImageQuestion, MultipleChoiceQuestion, TrailTest } from "@/types/global";
import { NextPage } from "next";
import { useEffect, useState } from "react";

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

const Test: NextPage = () => {
    const [questionArray, setQuestionArray] = useState<(MultipleChoiceQuestion | ImageQuestion | FillBlankSpaceQuestion)[]>([]);
    const [trail, setTrail] = useState<TrailTest>();
    const [pageAttributes, setPageAttributes] = useState<PageAttributes>({
        seconds: 0,
        questionId: 0
    });

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
                fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/trails/")
            );
            const data: TrailTest[] = await req.json();
            if (data.length > 0) {
                setTrail(data[0]);
                setQuestionArray([...data[0].multiple_choice_questions, ...data[0].image_text_questions, ...data[0].fill_blank_questions]);
            }
        }
        getTrail();
    }, []);
    
    return (
        <QuestionContainer
            time={formatTime(pageAttributes.seconds)}
            title={`Question ${pageAttributes.questionId + 1}`}
        >

        </QuestionContainer>
    );
}

export default Test;