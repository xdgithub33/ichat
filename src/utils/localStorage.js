let localStoage = {
  set: (key, data) => {
    localStorage.setItem(key, JSON.stringify({ data: data }))
  },
  get: key => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },
}
export default localStoage
