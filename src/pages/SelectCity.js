import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form, Left, Body, Button, Title, Right, ListItem, Text, CheckBox } from "native-base";
import {Modal} from 'react-native';
import { observer, inject } from "mobx-react";
import citylist from '../config/citylist'
@inject('uiStore', 'store')
@observer
export default class SelectCity extends Component {
  _onPress = () => {
    this.props.uiStore.modal = !this.props.uiStore.modal
  }
  _selectedCity = (item) => {
    const {store} = this.props
    store.addCity(item)
    this._onPress()
  }
  render() {
    const {store} = this.props
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.uiStore.modal}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this._onPress}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>选择城市</Title>
            </Body>
            <Right>
              <Button transparent onPress={this._onPress}>
                <Text>取消</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            {citylist.map(item => {
              return (
                <ListItem onPress={() => this._selectedCity(item)} key={item.code}>
                  <CheckBox checked={store.cityCodes.includes(item.code)} color="#29cc14"/>
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                </ListItem>
              )
            })}
          </Content>
        </Container>
      </Modal>
    );
  }
}