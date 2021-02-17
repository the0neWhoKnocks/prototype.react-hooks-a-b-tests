import React, { Fragment } from 'react';
import { css } from 'emotion';
import { arrayOf, string } from 'prop-types';

const ROOT_CLASS='ab-test-toggle';
const styles = css`
  .${ROOT_CLASS} {

    &__label {
      padding-right: 0.5em;
    }

    &__toggle {

      &-input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;

        &:checked + .${ROOT_CLASS}__toggle-label {
          color: #eee;
          background: #333;
        }
      }

      &-label {
        padding: 0 0.5em;
        border: solid 1px #333;
        border-radius: 0.25em;
        margin: 0 0.25em;
        cursor: pointer;
      }
    }
  }
`;

export default function ABTestBar({
  activeVariant,
  testName,
  testVariants,
}) {
  return (
    <div className={`${ROOT_CLASS} ${styles}`}>
      <label className={`${ROOT_CLASS}__label`}>{testName}</label>
      {testVariants.map((v) => (
         <Fragment key={v}>
           <input id={`${testName}_${v}`} className={`${ROOT_CLASS}__toggle-input`} type="radio" name={`${testName}_rad`} value={v} defaultChecked={activeVariant === v} data-test-name={testName} />
           <label htmlFor={`${testName}_${v}`} className={`${ROOT_CLASS}__toggle-label`}>{v}</label>
         </Fragment>
      ))}
    </div>
  );
}

ABTestBar.propTypes = {
  activeVariant: string,
  testName: string,
  testVariants: arrayOf(string),
};
