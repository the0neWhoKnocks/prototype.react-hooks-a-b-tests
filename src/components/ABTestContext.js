import React, { Component, createContext } from 'react';
import { arrayOf, objectOf, shape, string } from 'prop-types';
import merge from 'lodash.merge';

const ctx = createContext();

export default ctx;
export const { Consumer } = ctx;
export class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = merge({}, props.value);

    this.activateTest = this.activateTest.bind(this);
    this.deactivateTest = this.deactivateTest.bind(this);
    this.getTests = this.getTests.bind(this);
    this.getActiveVariant = this.getActiveVariant.bind(this);
    this.getVariants = this.getVariants.bind(this);
    this.setActiveVariant = this.setActiveVariant.bind(this);
  }

  activateTest(testName) {
    if (!this.state.activeTests.includes(testName)) {
      this.setState({ activeTests: [...this.state.activeTests, testName] });
    }
  };

  deactivateTest(testName) {
    if (this.state.activeTests.includes(testName)) {
      this.setState({ activeTests: this.state.activeTests.filter((t) => t !== testName) });
    }
  };

  getTests() {
    return this.state.tests;
  }

  getActiveVariant(testName) {
    return this.state.tests[testName] && this.state.tests[testName].variant;
  }

  getVariants(testName) {
    return this.state.tests[testName] && this.state.tests[testName].variants;
  }

  setActiveVariant(testName, variant) {
    if (this.state.tests[testName] && this.state.tests[testName].variants.includes(variant)) {
      this.setState(merge({}, this.state, {
        tests: { [testName]: { variant } }
      }));
    }
  }

  render() {
    const value = {
      // merge with current data
      ...this.state,
      // expose actions that allow for Provider updates
      actions: {
        activateTest: this.activateTest,
        deactivateTest: this.deactivateTest,
        getTests: this.getTests,
        getActiveVariant: this.getActiveVariant,
        getVariants: this.getVariants,
        setActiveVariant: this.setActiveVariant,
      },
    };

    return (
      <ctx.Provider value={value}>
        {this.props.children}
      </ctx.Provider>
    );
  }
}

Provider.defaultProps = {
  value: {
    activeTests: [],
    tests: {},
  },
};
Provider.propTypes = {
  value: shape({
    activeTests: arrayOf(string),
    tests: objectOf(shape({
      variant: string,
      variants: arrayOf(string),
    })),
  }),
};