import { catsData } from "/data.js"

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let i = 0; i < cats.length; i++){
        for (let j=0; j < cats[i].emotionTags.length; j++){
                emotionsArray.push(cats[i].emotionTags[j])
        }
    }
console.log(emotionsArray)
}

getEmotionsArray(catsData)

