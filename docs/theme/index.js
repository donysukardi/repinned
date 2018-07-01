import './styles/global'

import React from 'react'
import { theme, ThemeConfig, DocPreview } from 'docz'
import { ThemeProvider } from 'emotion-theming'
import ReactBreakpoints from 'react-breakpoints'

import { Main, Sidebar } from './components/shared'
import * as components from './components/ui'
import { mq, breakpoints } from './styles/responsive'
import { config } from './config'
import * as prismThemes from './styles/prism'
import * as modes from './styles/modes'

const themedComponents = {
  notFound: components.NotFound,
  render: components.Render,
  h1: components.H1,
  h2: components.H2,
  h3: components.H3,
  h4: components.H4,
  h5: components.H5,
  h6: components.H6,
  ul: components.List,
  loading: components.Loading,
  table: components.Table,
  pre: components.Pre,
  inlineCode: components.InlineCode,
}

const { Page } = components

const Theme = () => (
  <ThemeConfig>
    {config => {
      const PageContent = pageProps =>
        pageProps.doc.raw ? (
          <Page {...pageProps} />
        ) : (
          <ReactBreakpoints breakpoints={breakpoints}>
            <Main config={config}>
              {!pageProps.doc.fullscreen && <Sidebar />}
              <Page {...pageProps} />
            </Main>
          </ReactBreakpoints>
        )

      return (
        <ThemeProvider theme={{ ...config, mq, breakpoints }}>
          <DocPreview
            components={{
              page: PageContent,
              ...themedComponents,
            }}
          />
        </ThemeProvider>
      )
    }}
  </ThemeConfig>
)

const transform = ({ mode, ...config }) => ({
  ...config,
  prismTheme: prismThemes[mode],
  colors: modes[mode],
})

export default theme(config, transform)(Theme)
