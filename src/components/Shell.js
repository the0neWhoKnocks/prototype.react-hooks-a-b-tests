import React, { Component } from 'react';
import { Provider as ABTestProvider } from './ABTestContext';
import View from './View';

export default class Shell extends Component {
  render() {
    const { abTestData } = this.props;

    return (
      <ABTestProvider value={abTestData}>
        <View />
      </ABTestProvider>
    );
  }
}

Shell.propTypes = {
  abTestData: ABTestProvider.propTypes.value,
};
