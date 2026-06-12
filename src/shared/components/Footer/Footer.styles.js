import styled from "@emotion/styled";
export const Section = styled.div`
  h3,
  h4 {
    margin-bottom: 18px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    letter-spacing: 1px;
    color: #ffffff;
  }

  p,
  li {
    color: #cbd5e1;
    margin-bottom: 10px;
    list-style: none;
    font-size: 15px;
    line-height: 1.8;
    transition: color 0.3s ease;
    cursor: pointer;
  }

  p:hover,
  li:hover {
    color: #e60000;
  }

  ul {
    padding: 0;
    margin: 0;
  }
`;
export const Footer = styled.footer`
  background: #0a0a0f;
  color: white;
  margin-top: 0;
  padding-bottom: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  position: relative;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 70px 20px;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(220px, 1fr)
  );
  gap: 30px;
`;
export const Bottom = styled.div`
  text-align: center;
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  font-size: 14px;
  letter-spacing: 0.5px;
`;