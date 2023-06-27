"use client"
import { Container } from "@/components/Container/Container";
import { UserCard } from "@/components/Ranking/UserCard";
import { NextPage } from "next";

const Ranking: NextPage = () => {
    return (
        <Container
            style={{
                width: "70%",
                height: "900px",
                marginLeft: "15%",
                backgroundColor: "#eceeee",
                marginTop: "20px",
                overflow: "hidden",
                marginBottom: "20px",
                borderBottom: "solid 5px #76dcc2",
                borderRadius: "10px 10px 0 0"
            }}
        >
            <Container
                style={{
                    height: "50px",
                    backgroundColor: "#76dcc2",
                    borderTop: "solid 5px #76dcc2",
                    marginBottom: "20px",
                    borderBottom: "solid 5px #76dcc2",
                }}
            >
                <Container
                    style={{
                        color: "#fff",
                        fontSize: "28px",
                        marginTop: "10px",
                        width: "20%",
                        marginLeft: "15px",
                        float: "left"
                    }}
                >
                    Ranking
                </Container>
            </Container>
            <UserCard
                score=""
                style={{
                    backgroundColor: "#f19198"
                }}
                username=""
            />
            <UserCard
                score=""
                style={{
                    marginTop: "10px",
                    backgroundColor: "#f2c656"
                }}
                username=""
            />
            <UserCard
                score=""
                style={{
                    marginTop: "10px",
                    backgroundColor: "#b2e893"
                }}
                username=""
            />
            <UserCard
                score=""
                style={{
                    marginTop: "10px",
                }}
                username=""
            />
        </Container>
    );
}

export default Ranking;