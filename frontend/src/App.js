import { ThemeProvider } from "styled-components"
import {
  GlobalStyle,
  Portfolio,
  Header,
  Name,
  Bullshit,
  Wrap,
  Main,
  SocialListItem,
  SocialList,
  Footer,
} from "./components/styled/main"
import * as icons from "./icons/index"
// import { useUser } from "./context/user"

const theme = {
  colors: {
    brand: "#52DD64",
    gray1: "#828282",
    gray2: "#D2D2D2",
  },
}

const socials = [
  {
    name: "Github",
    icon: icons.github,
    externalLink: "https://github.com/522122",
  },
  {
    name: "LinkedIn",
    icon: icons.linkedin,
    externalLink: "https://linkedin.com/in/andrej-paskalev",
  },
]

function App() {
  // const [userState, userDispatcher, userActions] = useUser()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Portfolio>
        <Header>
          <Name>Andrej Paskalev</Name>
          <div>
            <Bullshit>Frontend, Backend</Bullshit>
            <Bullshit>Node, Vue, React, TypeScript</Bullshit>
          </div>
          <Wrap>JavaScript developer</Wrap>
        </Header>
        <Main>
          <SocialList>
            {socials.map((s, index) => (
              <SocialListItem even={(index + 1) % 2 === 0} key={s.name}>
                <a href={s.externalLink} target="_blank" rel="noreferrer">
                  <img key={s.name} src={s.icon} alt={s.name} />
                </a>
              </SocialListItem>
            ))}
          </SocialList>
        </Main>
        <Footer>2021</Footer>
      </Portfolio>
    </ThemeProvider>
  )
}

export default App
