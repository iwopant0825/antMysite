import styled from "styled-components"

export default function Section3(){
    return(
        <>
        <Section3Layout>
            <Title>test3</Title>
        </Section3Layout>
        </>
    )
}

const Section3Layout = styled.div`
    width:100%;
    height:100vh;
`
const Title = styled.div`
    color:white;
    font-size:125px;
`