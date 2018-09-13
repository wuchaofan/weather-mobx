import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Text, Body } from "native-base";
import { observer, inject } from "mobx-react";

@inject('store')
@observer
export default class WeatherCard extends Component {
  render () {
    const {store} = this.props
    return (
      <Content padder>
      {
        store.selectedCitys.map(item => {
          return (
            <Card key={item.code}>
              <CardItem header bordered>
                <Text>{item.name}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    NativeBase is a free and open source framework that enable
                    developers to build
                    high-quality mobile apps using React Native iOS and Android
                    apps
                    with a fusion of ES6.
                  </Text>
                </Body>
              </CardItem>
            </Card>
          )
        })
      }
        
      </Content>
    )
  }
}