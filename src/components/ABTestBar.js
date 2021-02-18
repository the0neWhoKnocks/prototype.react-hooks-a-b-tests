import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import ABTestToggle, { ROOT_CLASS as TOGGLE_ROOT_CLASS } from './ABTestToggle';
import abTestCtx from './ABTestContext';

const MODIFIER__BAR_OPENED = 'is--opened';
const ROOT_CLASS = 'ab-test-bar';
const styles = css`
  font-size: 1.5em;
  padding: 1em;
  border: solid 2px #333;
  border-right: none;
  border-bottom: none;
  border-radius: 0.5em 0 0 0;
  background: #ccc;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
  transition: transform 200ms;

  &.${MODIFIER__BAR_OPENED} {
    transform: translateY(0%);
  }

  .${ROOT_CLASS} {

    &__toggle-btn {
      font-size: inherit;
      padding: 0.25em 0.5em;
      border: solid 2px #333;
      border-bottom: none;
      border-radius: 0.5em 0.5em 0em 0em;
      outline: none;
      background: #ccc;
      position: absolute;
      bottom: 100%;
      right: 0;
    }
  }
  
  .${TOGGLE_ROOT_CLASS}:not(:first-child) {
    margin-top: 1em;
  }
`;

export default function ABTestBar() {
  const {
    activeTests,
    actions: {
      getActiveVariant,
      getTests,
      getVariants,
      setActiveVariant,
    },
  } = useContext(abTestCtx);
  const [barOpened, setBarOpened] = useState(true);

  const handleToggleClick = (ev) => {
    const cT = ev.target;
    setActiveVariant(cT.dataset.testName, cT.value);
  };

  function handleBarToggleClick() {
    setBarOpened(!barOpened);
  }

  const toggles = activeTests
    .filter((t) => !!getTests()[t])
    .map((t) => {
      const activeVariant = getActiveVariant(t);
      return (
        <ABTestToggle
          key={t}
          activeVariant={activeVariant}
          testName={t}
          testVariants={getVariants(t)}
        />
      );
    });

  const navModifier = barOpened ? MODIFIER__BAR_OPENED : '';

  return (
    <nav className={`${ROOT_CLASS} ${styles} ${navModifier}`}>
      <div onChange={handleToggleClick}>{toggles}</div>
      <button
        className={`${ROOT_CLASS}__toggle-btn`}
        onClick={handleBarToggleClick}
      >A/B Tests</button>
    </nav>
  );
}
