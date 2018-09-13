import React from 'react'
import {Text} from 'react-native'
import {inject, observer} from 'mobx-react'

@inject('store')
@observer
export default class Count extends React.Component {
  render () {
    const {store} = this.props
    console.log(store)
    return (<Text>{store.list.length}</Text>)
  }
}