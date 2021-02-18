import React from 'react';
import { css } from 'emotion';
import { arrayOf, shape, string } from 'prop-types';

export const ROOT_CLASS = 'body';
const styles = css`
  font-size: 2em;
  padding: 1em;
  background: #333;
  
  h3 {
    color: #aaa;
    margin: 0.25em 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  td {
    width: 50%;
    padding: 0.25em 0.5em;
    border: solid 1px #777;
  }
  
  thead td {
    color: #eee;
    background: rgba(255, 255, 255, 0.1);
  }
  
  tbody td {
    color: #ff8f00;
  }
`;

export default function Body({ activeVariants }) {
  return (
    <div className={`${ROOT_CLASS} ${styles}`}>
      <h3>Active Tests</h3>
      <table>
        <thead>
          <tr>
            {Object.keys(activeVariants[0]).map((key) => (
              <td key={key}>{key}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeVariants.map((props, ndx) => (
            <tr key={ndx}>
              {Object.values(props).map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Body.defaultProps = {
  activeVariants: [],
};
Body.propTypes = {
  activeVariants: arrayOf(shape({
    name: string,
    variant: string,
  })),
};
