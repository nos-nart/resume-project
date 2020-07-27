function getStorage(name) {
  return window.localStorage.getItem(name) || {}
}

function setStorage(name, data) {
  return window.localStorage.setItem(name, JSON.stringify(data))
}

module.exports = {
  getStorage,
  setStorage,
}
