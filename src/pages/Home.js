/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {observer, inject} from 'mobx-react'
import {createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Content, Card, CardItem, Text, Body } from "native-base";
import WeatherCard from './WeatherCard'
import SelectCity from './SelectCity'
@inject("uiStore")
@observer
class RightBtn extends Component {
  _onPress = () => {
    this.props.uiStore.modal = !this.props.uiStore.modal
  }
  render () {
    return (
      <TouchableOpacity style={{marginRight: 14}} onPress={this._onPress}>
        <Icon name="plus" size={26} color={'#fff'}/>
      </TouchableOpacity>
    )
  }
}

@inject("store", 'uiStore')
@observer
class Home extends Component {
  state = {
    count: 6
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: '天气',
      headerRight: <RightBtn/>,
      headerStyle: {
        backgroundColor: navigation.getParam('themeColor')
      },
      headerTintColor: navigation.getParam('textColor')
    }
  }
  componentDidMount () {
    const {themeColor, textColor} = this.props.uiStore
    this.props.navigation.setParams({textColor, themeColor})
  }
  _onPress = () => {
  }
  render() {
    console.log(this.props.uiStore.modal)
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <WeatherCard />
        {this.props.uiStore.modal && <SelectCity />}
      </Container>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: Home
  }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
