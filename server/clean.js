const clean = (content) => {
  
    const alphabet = content.replace(/[^A-Za-z']+/g, " ").trim()
    const lowerCase = alphabet.toLowerCase()
    return lowerCase
  }

export default clean;