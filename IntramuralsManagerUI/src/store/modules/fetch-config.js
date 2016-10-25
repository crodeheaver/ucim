export const baseURL = '//localhost:3001/api'
export let access_token = localStorage.getItem('token')
export const postHeaders = {'Content-Type': 'application/x-www-form-urlencoded'}
export let 

export const toFormData = function (json) {
  let formData = new FormData()

  for (let key in json) {
    formData.append(key, json[key])
  }
  return formData
}
