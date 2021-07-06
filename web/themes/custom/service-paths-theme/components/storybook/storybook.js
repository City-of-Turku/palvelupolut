/* eslint-disable react/no-danger, react/prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ToolbarContext } from '../../.storybook/mdxContainer';

/**
 * Wrapper for components in Storybook so they get spacing for preview.
 *
 * @param string markup
 *   Markup of the component to be displayed.
 * @param string label
 *   The label of the component
 * @param {bool} noWhitespace
 *   Set whether wrapper should have whitespace.
 * @param {any} children
 *   Child components.
 * @param rest
 */
const ComponentWrapper = ({
  markup,
  label,
  noWhitespace = false,
  children,
  ...rest
}) => (
  <div
    style={{
      ...(!noWhitespace && {
        margin: '2rem auto',
      }),
    }}
    {...rest}
  >
    {label && <h2 className="sb-story-label">Variant:{label}</h2>}
    <div id="component-root" dangerouslySetInnerHTML={{ __html: markup }} />
  </div>
);

ComponentWrapper.propTypes = {
  markup: PropTypes.string,
  label: PropTypes.string,
  noWhitespace: PropTypes.bool,
  children: PropTypes.node,
};

ComponentWrapper.defaultProps = {
  markup: undefined,
  label: undefined,
  noWhitespace: false,
  children: undefined,
};

/**
 * Wrapper for a collection of components.
 *
 * @param {any} children
 *   Child components.
 * @param {bool} negative
 *   If wrapper should work for negative colored components.
 * @param {bool} noWhitespace
 *   Set whether wrapper should have whitespace.
 * @param {string} layout
 *   Used to set the max width of the wrapper.
 * @param props
 */
const CollectionWrapper = ({
  children,
  negative,
  noWhitespace = false,
  layout,
  ...props
}) => {
  let maxWidth;
  switch (layout) {
    case 'medium':
      maxWidth = '50rem';
      break;
    case 'narrow':
      maxWidth = '30rem';
      break;
    case 'wide':
      maxWidth = 'none';
      break;
    default:
      maxWidth = '85rem';
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth,
        ...(!noWhitespace && {
          margin: '4.5rem auto',
          padding: '0 3rem',
        }),
        ...(negative && {
          background: 'black',
          '--sg-pattern-color': 'white',
          paddingBottom: '1.5rem',
          paddingTop: '1.5rem',
        }),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

CollectionWrapper.propTypes = {
  children: PropTypes.node,
  noWhitespace: PropTypes.bool,
  negative: PropTypes.bool,
  layout: PropTypes.string,
};

CollectionWrapper.defaultProps = {
  children: undefined,
  noWhitespace: false,
  negative: false,
  layout: undefined,
};

const Docs = ({ language = 'en', children }) => {
  const { locale } = useContext(ToolbarContext);
  return <>{locale === language && children}</>;
};

Docs.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
};

Docs.defaultProps = {
  children: undefined,
  language: 'en',
};

export { CollectionWrapper, ComponentWrapper, Docs };
