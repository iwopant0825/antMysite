import styled from "styled-components"

export default function Section2(){
    return(
        <>
        <Section2Layout>
            <Title>test2</Title>
        </Section2Layout>
        </>
    )
}

const Section2Layout = styled.div`
    width:100%;
    height:100vh;
`
const Title = styled.div`
    color:white;
    font-size:125px;
`