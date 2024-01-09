// import '../styles/globals.css'
import { createGlobalStyle, ThemeProvider, css } from 'styled-components'
import { ConfigProvider } from 'antd';

// useing antd css
const antdCss = css`
  ${import('antd/dist/reset.css')}
  font-family: 'Fredoka', sans-serif;
`;

// set global style --> reset css
const GlobalStyle = createGlobalStyle`

  ${antdCss}

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: 'Fredoka', sans-serif;
    vertical-align: baseline;
  }

  body {
    box-sizing: border-box;
    font-family: 'Fredoka', sans-serif;
    position: relative;

    font-size: 16px;
    line-height: 28px;
    font-weight: 400;
    min-height: 100%;
    background-color: #fff;
  }
  
  a {
    text-decoration:  none;
  }
`

// set theme
const theme = {
  colors: {
    primary: '#058335', //green
    secondary: '#f35858', //red
    accent: '#588ef3' //blue
  },
  textColors: {
    primary: '#fff',
    secondary: 'gray',
    warnning: 'orange',
    error: '#f35858',
    success: '#52c41a' // strong green
  },
  breakpoints: {
    mobile: '576px',
    tablet: '820px',
    notebook: '1080px',
  }
}


function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ConfigProvider>
    </>
  )
}

export default MyApp
