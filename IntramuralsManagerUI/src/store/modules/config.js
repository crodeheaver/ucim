export const BASE_URL = '//localhost:3001/api'
export let accessToken = localStorage.getItem('token')
export const POST_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'}

export const toFormData = function (json) {
  let formData = new FormData()

  for (let key in json) {
    formData.append(key, json[key])
  }
  return formData
}
