import React, {Component} from 'react';
import { Card, CardItem, Text, Body, Spinner, ListItem, Icon, Left, Right, Button } from "native-base";
import { observer, inject } from "mobx-react";
import {View} from 'react-native'
import {withNavigation} from 'react-navigation'
@inject('store', 'uiStore')
@observer
class DetailWeatherCard extends Component {
  render () {
    const {uiStore, weatherinfo, navigation} = this.props
    let bodyContent = null
    if (!weatherinfo) {
      bodyContent =<View style={{alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center'}}><Spinner color={uiStore.themeColor}/></View>
    } else {
      bodyContent = (
        <>
          <ListItem icon>
            <Left>
              <Icon name="thermometer" style={{color: uiStore.themeColor}}/>
            </Left>
            <Body>
              <Text>温度</Text>
            </Body>
            <Right>
              <Text>{weatherinfo.high} ~ {weatherinfo.low}</Text>
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
              <Text>{weatherinfo.fx}</Text>
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
              <Text>{weatherinfo.fl}</Text>
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
              <Text>{weatherinfo.fl}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 13, color: 'red'}}>{weatherinfo.notice}</Text>
          </ListItem>
        </>
      )
    }
    return (
      <Card>
        <CardItem header bordered>
          <Left>
            <Text style={{color: uiStore.themeColor, marginRight: 10}}>{navigation.state.params.name}</Text>
          </Left>
          <Body>
            <Text>{weatherinfo.type}</Text>
          </Body>
          <Right>
            <Text>{weatherinfo.date}</Text>
          </Right>

        </CardItem>
        <CardItem bordered>
          <Body>
            {bodyContent}
          </Body>
        </CardItem>
      </Card>
    )
  }
}

export default withNavigation(DetailWeatherCard)