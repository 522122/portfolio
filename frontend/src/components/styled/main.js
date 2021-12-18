import styled, { createGlobalStyle } from "styled-components"

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`

export const GlobalStyle = createGlobalStyle`    
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }
`

export const Portfolio = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled(Container)`
  margin-top: 120px;
  margin-bottom: 170px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .bs {
    color: ${({ theme }) => theme.colors.gray2};
  }

  @media (max-width: 768px) {
    margin-top: 40px;
    margin-bottom: 60px;
  }
`

export const Name = styled.div`
  color: ${({ theme }) => theme.colors.brand};
  font-family: "Roboto", sans-serif;
  font-size: 60px;
  line-height: 58px;
  width: 280px;
  letter-spacing: 2px;
  font-weight: bold;
  margin-right: 20px;
`

export const Bullshit = styled.div`
  font-family: Arial;
  font-size: 16px;
  letter-spacing: 3px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray2};
`

export const Wrap = styled.div`
  width: 100%;
  padding-left: 200px;
  color: ${({ theme }) => theme.colors.gray1};
  font-weight: bold;
  font-size: 24px;
  letter-spacing: -1px;
  font-family: Arial;
  text-transform: uppercase;
  @media (max-width: 768px) {
    padding: 0;
    text-align: center;
  }
`

export const Main = styled(Container)`
  display: flex;
  justify-content: center;
`

export const SocialList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const SocialListItem = styled.li`
  list-style: none;
  margin: 45px;

  a {
    display: block;
    text-decoration: none;
    opacity: ${({ even }) => (even ? 1 : 0.4)};
    transition: all 0.3s ease;

    &:hover {
      opacity: ${({ even }) => (even ? "0.4" : "1")};
      transform: scale(1.1);
    }

    img {
      width: 155px;
    }
  }

  @media (max-width: 768px) {
    margin: 15px;
    a img {
      width: 100%;
    }
  }
`

export const Footer = styled(Container)`
  text-align: center;
  font-family: Arial;
  font-size: 18px;
  letter-spacing: 3px;
  margin-top: auto;
  padding-bottom: 20px;
  padding-top: 20px;
  color: ${({ theme }) => theme.colors.gray2};
`
