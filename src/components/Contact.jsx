import styled from "styled-components";

export default function Contact() {
  return (
    <Section>
      <Grid>
        <Left>
          <Kicker>Contact</Kicker>
          <BigTitle>Let’s work together</BigTitle>
          <Paragraph>
            간단한 인사부터 협업 제안까지 언제든 환영합니다. 아래 폼은 데모이며,
            실제 전송은 구현되어 있지 않습니다.
          </Paragraph>
        </Left>
        <Right>
          <Form onSubmit={(e) => e.preventDefault()}>
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea rows={5} placeholder="Say hello..." />
            </label>
            <Button type="submit">Send (demo)</Button>
          </Form>
        </Right>
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #f8f8f8;
  padding-top: 80px;
  padding-bottom: 140px;

  @media (max-width: 1100px) {
    padding-left: 0;
    padding-top: 60px;
  }
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Left = styled.div``;
const Right = styled.div``;

const Kicker = styled.h3`
  color: #000000;
  font-size: 20px;
  font-weight: 800;
`;

const BigTitle = styled.h2`
  color: #000000;
  font-weight: 900;
  font-size: clamp(36px, 6vw, 80px);
  line-height: 1;
  margin-top: 8px;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;

  label {
    display: grid;
    gap: 6px;
    color: #222;
    font-size: 14px;
  }
  input, textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid #ddd;
    outline: none;
    font-size: 14px;
  }
  textarea { resize: vertical; }
`;

const Button = styled.button`
  margin-top: 6px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
`;


