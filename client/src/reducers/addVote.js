const addVote = (arr, obj) => {
    //console.log('add func arr', arr)
    //console.log('add func obj', obj)
    let newArr = arr
    let card = newArr.filter(val => val.projectId === obj.projectId)
    console.log('the card filtered', card)
    card[0].votes.push(obj)
    //console.log('the new', newArr)
    return newArr
}

export default addVote