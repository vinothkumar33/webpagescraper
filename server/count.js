
const fetchUrlContent = (url) => {
    return axios.get(url)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
      })
  }

const clean = (content) => {
    const alphabet = content.replace(/[^A-Za-z']+/g, " ").trim()
    const lowerCase = alphabet.toLowerCase()
    return lowerCase
  }

const count = (string) => {
    let count= 0;
    const words = string.split(" ").filter(word => word !== "")
  
    for (let i = 0; i < words.length; i++) {
      const item = words[i]
      if(item){
         count +=1;
      }
    }
  
    return count;
  }

export default {fetchUrlContent,clean,count};