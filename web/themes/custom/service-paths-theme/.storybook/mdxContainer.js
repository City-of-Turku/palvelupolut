import React from 'react';
import { DocsContainer } from '@storybook/addon-docs';

export const ToolbarContext = React.createContext();

export default ({ children, context }) => {
  const {
    globals: { locale },
  } = context;

  return (
    <DocsContainer context={context}>
      <ToolbarContext.Provider value={{ locale }}>
        {children}
      </ToolbarContext.Provider>
    </DocsContainer>
  );
};
