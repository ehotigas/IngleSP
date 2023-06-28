"use client"

import { Container } from "@/components/Container/Container";
import { QuestionContainer } from "@/components/Container/QuestionContainer/QuestionContainer";
import { Button } from "@/components/PlacementTest/Button/Button";
import { UserCard } from "@/components/Ranking/UserCard";
import { Ranking, User } from "@/types/global";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlacementTest: NextPage = () => {
    const [ranking, setRanking] = useState<Ranking>({
        position: 0,
        user: "",
        score: 0
    });
    const { data: session } = useSession();
    const user: User | undefined = session?.user;
    const router = useRouter();

    useEffect(() => {
        const getPosition = async () => {
            const req = await Promise.resolve(
                fetch(`http://localhost:3000/api/ranking/test/${user?.username}`)
            );
            const data: Ranking = await req.json();
            setRanking(data);
        }
        getPosition();
    }, []);

    return (
        <QuestionContainer
            title={`Result`}
            time={`Score: ${ranking.score}`}
        >
            <Container
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "20px"
                }}
            >
                Congratulations {user?.username}!
            </Container>
            <Container
                style={{
                    fontSize: "20px",
                    marginLeft: "20px"
                }}
            >
                You finished placement test with score {ranking.score} seconds.
            </Container>
            <Container
                style={{
                    marginTop: "70px"
                }}
            >
                <UserCard
                    score={ranking.score}
                    username={`${ranking.position}. ${user?.username}`}
                />
            </Container>
            <Container
                style={{
                    fontSize: "20px",
                    marginTop: "20px",
                    textAlign: "center",
                    fontWeight: "bold"
                }}
            >
                You are {ranking.position} th in ranking.
            </Container>

            <Container>
                <Button
                    onClick={() => { router.push("/") }}
                    style={{
                        width: "200px",
                        marginLeft: "calc((100% - 200px)/2)",
                        marginTop: "50px"
                    }}
                    text="RETURN"
                />
            </Container>
        </QuestionContainer>
    );
}

export default PlacementTest;