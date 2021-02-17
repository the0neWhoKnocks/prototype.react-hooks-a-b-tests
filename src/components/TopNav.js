import React, { useContext } from 'react';
import { css } from 'emotion';
import abTestCtx from './ABTestContext';

const styles = css`
  padding: 1em;
  background: #ccc;
  display: flex;

  button {
    width: 100%;
    white-space: nowrap;
  }
`;

export default function TopNav() {
  const { actions: { getActiveVariant } } = useContext(abTestCtx);
  const variant = getActiveVariant('test001');
  let variantStyles = {};

  if (variant === 'A') {
    variantStyles = css`
      background: #666;
    `;
  }
  else if (variant === 'B') {
    variantStyles = css`
      display: inline-block;

      button {
        width: 100%;
        display: block;
      }
    `;
  }

  return (
    <nav className={`${ css(styles, variantStyles) }`}>
      { Array(10).fill().map((v, ndx) => <button key={`btn_${ndx}`}>Button {ndx+1}</button>) }
    </nav>
  );
}