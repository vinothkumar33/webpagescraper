import axios from "axios"

const fetchUrlContent = (url) => {
    return axios.get(url)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
      })
  }

  export default fetchUrlContent;