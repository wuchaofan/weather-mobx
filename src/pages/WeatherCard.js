import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Text, Body, Spinner, List, ListItem, Icon, Left, Right, Badge } from "native-base";
import { observer, inject } from "mobx-react";
import {View} from 'react-native'
@inject('store', 'uiStore')
@observer
export default class WeatherCard extends Component {
  state = {
    weatherinfo: null
  }
  getCurrentWeather = async () => {
    const {store, city} = this.props
    const res = await fetch(`http://mobile.weather.com.cn/data/sk/${city.code}.html`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return res.json()
  }
  componentDidMount () {
    this.getCurrentWeather().then(({sk_info: weatherinfo}) => {
      // console.log(weatherinfo)
      this.setState({weatherinfo})
    })
  }
  render () {
    const {uiStore, city} = this.props
    const {weatherinfo} = this.state
    let BodyContent = null
    if (!weatherinfo) {
      BodyContent =<View style={{alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center'}}><Spinner color={uiStore.themeColor}/></View>
    } else {
      BodyContent = (
        <>
          <ListItem icon>
            <Left>
              <Icon name="thermometer" style={{color: uiStore.themeColor}}/>
            </Left>
            <Body>
              <Text>温度</Text>
            </Body>
            <Right>
              <Text>{weatherinfo.temp}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="infinite" style={{color: uiStore.themeColor}}/>
            </Left>
            <Body>
              <Text>风向</Text>
            </Body>
            <Right>
              <Text>{weatherinfo.wd}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="cloudy-night" style={{color: uiStore.themeColor}}/>
            </Left>
            <Body>
              <Text>风力</Text>
            </Body>
            <Right>
              <Text>{weatherinfo.ws}</Text>
            </Right>
          </ListItem>
        </>
      )
    }
    return (
        <Card>
          <CardItem header bordered>
            <Left>
              <Text style={{color: uiStore.themeColor, marginRight: 10}}>{city.name}</Text>
            </Left>
            <Body>
            </Body>
            {weatherinfo && (<Right>
              <Text>{weatherinfo.time}</Text>
            </Right>)}

          </CardItem>
          <CardItem bordered>
            <Body>
              {BodyContent}
            </Body>
          </CardItem>
        </Card>
    )
  }
}