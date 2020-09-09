export default class LocalStorage {
  constructor() {
    this.storage = window.localStorage || {}
  }

  add(key, item) {
    this.storage.setItem(key, item)
  }

  get(key) {
    const item = this.storage.getItem(key)

    return item
  }

  clear() {
    this.storage.clear()
  }
}
