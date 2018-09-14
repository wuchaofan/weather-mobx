/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, StatusBar, View} from 'react-native';
import {observer, inject} from 'mobx-react'
import {createStackNavigator} from 'react-navigation'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Content, Text, Button } from "native-base";
import WeatherCard from './WeatherCard'
import SelectCity from './SelectCity'
import {Icon} from 'native-base'
import Detail from './Detail'
import Loading from './Loading'


@inject("uiStore", 'store')
@observer
class RightBtn extends Component {
  _onPress = () => {
    this.props.uiStore.modal = !this.props.uiStore.modal
  }
  _refresh = () => {
    const {store} = this.props
    store.selectedCitys = [...store.selectedCitys]
  }
  render () {
    return (
      <View style={{marginRight: 14, flexDirection: 'row', alignItems: 'center'}}>
        <Button transparent onPress={this._refresh}>
          <Icon name='refresh' size={30} style={{color: '#fff'}}/>
        </Button>
        <TouchableOpacity style={{marginRight: 0}} onPress={this._onPress}>
          <Icon name="add" size={30} style={{color: '#fff'}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

@inject("store", 'uiStore')
@observer
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  static navigationOptions = ({navigation}) => {
    console.log({navigation})
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
  render() {
    const {store} = this.props
    console.log(store.selectedCitys)
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <Content padder>
          {
            store.selectedCitys.map(item => <WeatherCard city={item} key={item.code}/>)
          }
          <SelectCity />
        </Content>
      </Container>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: Home
  },
  Detail: Detail
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
