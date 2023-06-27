"use client"

import { Container } from "@/components/Container/Container";
import { NextPage } from "next";
import { useState } from "react";

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
    const [pageAttributes, setPageAttributes] = useState<PageAttributes>({
        seconds: 0,
        questionId: 0
    });
    
    
    return (
        <Container>
            
        </Container>
    );
}

export default Test;