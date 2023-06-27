"use client"
import { Container } from "@/components/Container/Container";
import { Test } from "./Toolkit/Test";
import { Connection } from "./Toolkit/Connection";

const Trail = () => {
    return (
        <Container
            style={{
                width: "70%",
                height: "900px",
                marginLeft: "15%",
                backgroundColor: "#eceeee",
                marginTop: "20px",
                borderTop: "solid 5px #76dcc2",
                overflow: "auto",
                marginBottom: "20px",
                borderBottom: "solid 5px #76dcc2",
            }}
        >
            <Container
                style={{ float: "left" }}
            >
                <Test
                    to="/trail/placement-test"
                    text="Placement Test"
                    style={{
                        marginLeft: "calc((100% - 300px)/2)",
                        marginTop: "100px"
                    }}
                />
            </Container>
            <Container
                style={{ float: "left" }}
            >
                <Connection locked={true} />
            </Container>
            <Container
                style={{ float: "left" }}
            >
                <Test
                    to="/trail/test"
                    text="Test 1"
                    style={{
                        marginLeft: "calc((100% - 300px)/2)",
                    }}
                />
            </Container>
        </Container>
    );
}

export default Trail;