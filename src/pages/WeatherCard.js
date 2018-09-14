import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Text, Body, Spinner, List, ListItem, Icon, Left, Right, Button } from "native-base";
import { observer, inject } from "mobx-react";
import {View, TouchableOpacity} from 'react-native'
// import IconFont from 'react-native-vector-icons/FontAwesome'
import {withNavigation} from 'react-navigation'
@inject('store', 'uiStore')
@observer
class WeatherCard extends Component {
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
  intoDetail = () => {
    const {store, city, navigation} = this.props
    console.log(navigation)
    navigation.push('Detail', {name: city.name, code: city.code})
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
              {/* <IconFont name="angle-right" size={26}/> */}
            </Right>)}

          </CardItem>
          <CardItem bordered>
            <Body>
              {BodyContent}
            </Body>
          </CardItem>
          <CardItem footer style={{width: '100%'}}>
            <TouchableOpacity onPress={this.intoDetail} style={{width: '100%'}}>
              <View style={{width: '100%'}}><Text style={{color: uiStore.themeColor, fontSize: 12}}>更多</Text></View>
            </TouchableOpacity>
          </CardItem>
        </Card>
    )
  }
}

export default withNavigation(WeatherCard)