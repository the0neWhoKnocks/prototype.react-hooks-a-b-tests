import React, { Fragment, useContext } from 'react';
import { css } from 'emotion';
import abTestCtx from './ABTestContext';
import ABTestBar from './ABTestBar';
import Body, { ROOT_CLASS as BODY_ROOT_CLASS } from './Body';
import TopNav, { ROOT_CLASS as NAV_ROOT_CLASS } from './TopNav';

export const ROOT_CLASS = 'view';
const AB_TEST__NAV_POS = 'test001';
const AB_TEST__FONT_COLOR = 'test002';
const styles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .${BODY_ROOT_CLASS} {
    height: 100%;
  }
  
  .${NAV_ROOT_CLASS} {
    padding: 1em;
    background: #ccc;
    display: flex;
  
    button {
      width: 100%;
      font-size: 1.1em;
      white-space: nowrap;
      border: solid 1px;
      border-top: none;
      border-bottom: none;
      background: transparent;
    }
    button:first-child {
      border-left: none;
    }
    button:last-child {
      border-right: none;
    }
  }
  
  &.${AB_TEST__NAV_POS}--A {
    
    .${NAV_ROOT_CLASS} {
      background: #666;
      
      button {
        color: #eee;
        border-color: #333;
      }
    }
  }
  
  &.${AB_TEST__NAV_POS}--B {
    flex-direction: row;
    
    .${NAV_ROOT_CLASS} {
      width: 200px;
      flex-direction: column;
      flex-shrink: 0;
      
      button {
        text-align: left;
        padding: 0.5em 0;
        border: solid 1px #aaa;
        border-left: none;
        border-right: none;
      }
      button:first-child {
        border-top: none;
      }
      button:last-child {
        border-bottom: none;
      }
    }
    
    .${BODY_ROOT_CLASS} {
      width: 100%;
    }
  }
  
  &.${AB_TEST__FONT_COLOR}--A {
    
    .${BODY_ROOT_CLASS} tbody td {
      color: #7ce0ff;
    }
  }
`;
let prevData;

export default function View() {
  const {
    activeTests,
    actions: {
      getActiveVariant,
      getTests,
    },
  } = useContext(abTestCtx);
  const navVariant = getActiveVariant(AB_TEST__NAV_POS);
  const colorVariant = getActiveVariant(AB_TEST__FONT_COLOR);
  const variantModifiers = [];
  
  if (navVariant !== 'Control') variantModifiers.push(`${AB_TEST__NAV_POS}--${navVariant}`);
  if (colorVariant !== 'Control') variantModifiers.push(`${AB_TEST__FONT_COLOR}--${colorVariant}`);
  
  const activeVariants = [];
  activeTests
    .filter((t) => !!getTests()[t])
    .map((t) => {
      const activeVariant = getActiveVariant(t);
      activeVariants.push({ name: t, variant: activeVariant });
    });
  
  const flatData = JSON.stringify(activeVariants);
  if (flatData !== prevData) {
    console.table(activeVariants);
    prevData = flatData;
  }
  
  return (
    <div className={`${ROOT_CLASS} ${styles} ${variantModifiers.join(' ')}`}>
      <ABTestBar />
      <TopNav />
      <Body activeVariants={activeVariants} />
    </div>
  );
}
