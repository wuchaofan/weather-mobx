/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from './src/pages/Home'
import {Provider} from 'mobx-react'
import store, {uiStore} from './src/store'
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store} uiStore={uiStore} >
        <Home />
      </Provider>
    );
  }
}
