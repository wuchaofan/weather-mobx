import {observable, computed, action} from 'mobx'

class Todo {
  @observable selectedCitys = [{code: '101020100', name: '上海'},]
  @action addCity (city) {
    this.selectedCitys.push(city)
  }
  @computed
  get cityCodes () {
    return this.selectedCitys.map(item => item.code)
  }
}

class UIStore {
  @observable themeColor = '#6b52ae'
  @observable textColor = 'white'
  @observable modal = false
}
export default new Todo()

export const uiStore = new UIStore()
