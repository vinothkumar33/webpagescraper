

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

export default count;