"use client"

import { Container } from "@/components/Container/Container";
import { QuestionContainer } from "@/components/Container/QuestionContainer/QuestionContainer";
import { Button } from "@/components/PlacementTest/Button/Button";
import { UserCard } from "@/components/Ranking/UserCard";
import { User } from "@/types/global";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const PlacementTest = () => {
    const { data: session } = useSession();
    const user: User | undefined = session?.user;
    const router = useRouter();
    const params = useSearchParams();
    console.log();
    return (
        <QuestionContainer
            title={`Result`}
            time={`Score: ${params?.get("score")?.replace("-", "/")}`}
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
                You finished placement test with score {params?.get("score")?.replace("-", "/")}, in {params?.get("time")} seconds.
            </Container>
            <Container
                style={{
                    marginTop: "70px"
                }}
            >
                <UserCard
                    score="3/3"
                    username={`x. ${user?.username}`}
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
                You are x th in ranking.
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