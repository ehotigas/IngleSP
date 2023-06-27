import { Container } from "@/components/Container/Container"

export const ProjectText = () => {
    return (
        <Container
            style={{
                width: "50%",
                float: "left",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "17vh"
            }}>
            <section>
                <h2
                    style={{
                        textAlign: "center"
                    }}
                >O projeto InglêSP</h2>
                <p>O projeto InglêSP surgiu da necessidade no apoio à formação continuada dos professores de Inglês da rede pública estadual em São Paulo. Com o apoio dos estudantes do curso de Engenharia da Computação da UNIFESP no desenvolvimento do software, esta plataforma poderá ser utilizada pelos profissionais da rede para o estudo e conhecimento sobre as habilidades do Currículo Paulista e sobre os instrumentos e recursos complementares para o ensino e aprendizagem do ensino do idioma nas escolas.</p>
            </section>
        </Container>
    )
}