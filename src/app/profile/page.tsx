"use client"
import { Container } from "@/components/Container/Container";
import { UserCardInfos } from "./Toolkit/UserCardInfos";
import { UserForm } from "./Toolkit/UserForm";
import { NextPage } from "next";

const Profile: NextPage = () => {
    return (
        <Container
            style={{
                float: "left",
                width: "80%",
                marginLeft: "10%",
                marginTop: "7vh",
                marginBottom: "7vh",
            }}
        >
            {/* Capa */}
            <Container
                style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#a5aaad94",
                    borderRadius: "7px 7px 0 0 "
                }}
            >
            </Container>
            

            <UserCardInfos />

            <UserForm />

            {/* Bottom */}
            <Container
                style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: "#a5aaad94",
                    float: "left",
                    borderRadius: "0 0 7px 7px"
                }}
            >
            </Container>
        </Container>
    );
}


export default Profile;