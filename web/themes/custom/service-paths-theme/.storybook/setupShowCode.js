import { renderToStaticMarkup } from 'react-dom/server'
import { AllHtmlEntities } from 'html-entities'
import prettier from 'prettier'
import HTMLParser from 'prettier/parser-html'
const entities = new AllHtmlEntities()


export default (story) => {
  const markup = entities.decode(renderToStaticMarkup(story()))
  const parser = new DOMParser();
  const dom = parser.parseFromString(markup, 'text/html');
  const componentRoot = dom.querySelector('#component-root')
  return prettier.format(componentRoot.innerHTML, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
    plugins: [HTMLParser],
  })
}

