import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import {
  collectBlockCode,
  container,
  extendLinks,
  noticeboard,
} from '../src/index'

import content from './content'

import 'highlight.js/styles/github.css'
import '../src/styles/collect-block-code.scss'
import '../src/styles/container.scss'
import '../src/styles/noticeboard.scss'

const wrapper = document.getElementById('app')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight(code: string, language: string) {
    if (language && hljs.getLanguage(language))
      return `<pre data-lang="${language}"><div>${hljs.highlight(code, { language }).value}</div></pre>`

    return `<pre data-lang="unknown"><div>${code}</div></pre>`
  },
})
  // .use(collectBlockCode, { copy: true, blockName: true })
  // .use(codeLineNumbers)
  // .use(noticeboard)
  // .use(container)
  .use(extendLinks)

wrapper!.innerHTML = md.render(content)
