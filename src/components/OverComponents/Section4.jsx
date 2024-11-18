import styled from "styled-components"

export default function Section4(){
    return(
        <>
        <Section4Layout>
            <Title>test4</Title>
        </Section4Layout>
        </>
    )
}

const Section4Layout = styled.div`
    width:100%;
    height:100vh;
`
const Title = styled.div`
    color:white;
    font-size:125px;
`