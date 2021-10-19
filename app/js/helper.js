function convert2D(index , colCount){
    return{
        'i':index % colCount,
        'j':(index - (index%colCount))/colCount
    }
}
export default {
    randomInt(min,max,notIn){
        let randInt = null
        let n = 1000
        if(typeof notIn =='undefined'){
            notIn = null
        }
         while (n>0){
              randInt =Math.round(min + Math.random()* (max-min));
              if(notIn!=null&& notIn.indexOf(randInt) === -1 ){{
                  return randInt
              }}
              else n--
         }
         console.eror('random number generate fail')
         return -1
    },
    neighbor(index, direction,colCount,rowCount){
     
        const {i,j} = convert2D(index,colCount)
        //right
        if(i+1<colCount &&direction==='right'){
            return index+1
        }
        //up
        if(j>0 && direction==='up'){
            return index - colCount
        }
        //left
        if(i>0 && direction==='left'){
            return index -1;
        }
        //down
        if(j+1<rowCount && direction ==='down'){
            return index+rowCount
        }
        return false
     }
    
}