import { renderToStaticMarkup } from 'react-dom/server';
import { AllHtmlEntities } from 'html-entities';
import prettier from 'prettier';
import HTMLParser from 'prettier/parser-html';

const entities = new AllHtmlEntities();

/**
 * Customise the Docs page source content.
 *
 * Extract the story markup and render it with Prettier.
 * @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#customizing-source-snippets
 *
 * @param source
 * @param storyContext
 * @return {*}
 */
export default (source, storyContext) => {
  // console.log({ source, storyContext });
  // const story = storyContext.storyFn();
  // const markup = entities.decode(renderToStaticMarkup(story));
  // const parser = new DOMParser();
  // const dom = parser.parseFromString(markup, 'text/html');
  // const componentRoot = dom.querySelector('#component-root');
  // return "<h1>Hi</h1>";
  // return prettier.format(componentRoot.innerHTML, {
  //   parser: 'html',
  //   htmlWhitespaceSensitivity: 'ignore',
  //   plugins: [HTMLParser],
  // });
  const story = storyContext.storyFn();
  const markup = entities.decode(renderToStaticMarkup(story));
  const code = prettier.format(markup, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
    plugins: [HTMLParser],
  });
  // return <>
  //   <h1>This is the source code</h1>
  // </>
  return <>{code}</>;
};
