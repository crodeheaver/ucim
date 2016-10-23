export const baseURL = '//localhost:3001/api'
export const postHeaders = {'Content-Type': 'application/x-www-form-urlencoded'}

export const toFormData = function (json) {
  let formData = new FormData()

  for (let key in json) {
    formData.append(key, json[key])
  }
  return formData
}
