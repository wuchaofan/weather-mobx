import React, { Component } from "react";
import {observer, inject} from 'mobx-react'
import { Container, Content, Text, Button } from "native-base";
import DetailWeatherCard from './DetailWeatherCard'

@inject("uiStore", 'store')
@observer
export default class Detail extends Component {
  constructor (props) {
    super(props)
    const {themeColor, textColor} = this.props.uiStore
    this.props.navigation.setParams({textColor, themeColor})
    this.props.store.getWeatherList(this.props.navigation.state.params.name)
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.name,
      headerStyle: {
        backgroundColor: navigation.state.params.themeColor
      },
      headerTintColor: navigation.state.params.textColor
    }
  }
  getWeather = () => {

  }
  render () {
    const {detailCity} = this.props.store
    return (
      <Container>
        <Content padder>
          {
            detailCity.map(item => {
              return (
                <DetailWeatherCard weatherinfo={item} key={item.date}/>
              )
            })
          }
        </Content>
      </Container>
    )
  }
}