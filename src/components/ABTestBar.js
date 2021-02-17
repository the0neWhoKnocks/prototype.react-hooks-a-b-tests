import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import ABTestToggle from './ABTestToggle';
import abTestCtx from './ABTestContext';

const MODIFIER__BAR_OPENED = 'is--opened';
const ROOT_CLASS='ab-test-bar';
const styles = css`
  padding: 1em;
  border-top: solid 1px #333;
  background: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(100%);
  transition: transform 200ms;

  &.${MODIFIER__BAR_OPENED} {
    transform: translateY(0%);
  }

  .${ROOT_CLASS} {

    &__toggle-btn {
      border: solid 1px #333;
      border-bottom: none;
      background: #ccc;
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export default function ABTestBar() {
  const ctx = useContext(abTestCtx);
  const {
    activeTests,
    actions: {
      getActiveVariant,
      getTests,
      getVariants,
      setActiveVariant,
    },
  } = ctx;
  const [barOpened, setBarOpened] = useState(true);

  const handleToggleClick = (ev) => {
    const cT = ev.target;
    setActiveVariant(cT.dataset.testName, cT.value);
  };

  function handleBarToggleClick() {
    setBarOpened(!barOpened);
  }

  const logData = [];
  const toggles = activeTests
    .filter((t) => !!getTests()[t])
    .map((t) => {
      const activeVariant = getActiveVariant(t);
      logData.push({ 'Active Test': t,  Variant: activeVariant });
      return (
        <ABTestToggle
          key={t}
          activeVariant={activeVariant}
          testName={t}
          testVariants={getVariants(t)}
        />
      );
    });
  console.table(logData);

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
