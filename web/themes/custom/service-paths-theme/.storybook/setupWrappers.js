/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper for components in Storybook.
 */
export const ComponentRoot = ({ markup, ...rest }) => {
  const classes = ['component-root'];

  return (
    <div
      id="component-root"
      dangerouslySetInnerHTML={{ __html: markup }}
      className={classes.join(' ')}
      {...rest}
    />
  );
};

ComponentRoot.propTypes = {
  markup: PropTypes.string,
};

ComponentRoot.defaultProps = {
  markup: undefined,
};
