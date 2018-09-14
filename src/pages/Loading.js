
import React, {Component} from 'react';
import {Platform, View} from 'react-native';
import { Spinner, Toast } from "native-base";
import {observer, inject} from 'mobx-react'

@inject("uiStore", 'store')
@observer
export default class Loading extends Component {
  show = () => {
    Toast.show({
      text: "请求失败～",
      buttonText: "Error",
      duration: 3000
    })
  }
  
  render () {
    const {store, uiStore} = this.props
    if (store.ajaxStatus == 'pending') {
      return <View style={{alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}><Spinner color={uiStore.themeColor}/></View>
    } else if (store.ajaxStatus == 'error') {
      this.show()
      return null
    } else {
      return null
    }
  }
}

