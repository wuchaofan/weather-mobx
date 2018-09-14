import {observable, computed, action, runInAction} from 'mobx'

class Todo {
  @observable ajaxStatus = 'init' // "pending" / "done" / "error"

  @observable selectedCitys = [{code: '101020100', name: '上海'},]
  @action addCity (city) {
    this.selectedCitys.push(city)
  }
  @action removeCity(city) {
    this.selectedCitys = this.selectedCitys.filter(item => item.code !== city.code)
  }
  @computed
  get cityCodes () {
    return this.selectedCitys.map(item => item.code)
  }

  @observable detailCity = []
  @action getWeatherList = (name) => {
    const api = `https://www.sojson.com/open/api/weather/json.shtml?city=${encodeURIComponent(name)}`
    this.detailCity = []
    this.ajaxStatus = "pending"
    fetch(api).then(res => res.json()).then(({status, data}) => {
      console.log()
      if (status === 200) {
        runInAction(() => {
            this.detailCity = data.forecast
            this.ajaxStatus = 'done'
        })
      } else {
        runInAction(() => {
            this.ajaxStatus = 'error'
        })
      }
    }, _ => {
      runInAction(() => {
        this.ajaxStatus = 'error'
      })
    })
  }
}

class UIStore {
  @observable themeColor = '#6b52ae'
  @observable textColor = 'white'
  @observable modal = false
}
export default new Todo()

export const uiStore = new UIStore()
