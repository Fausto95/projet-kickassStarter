const deleteVote = (arr, obj) => {
    let newArr = arr
    let el = newArr.filter( val => val.projectId === obj.projectId )
    console.log('el', el)
    //console.log('arr', arr)
    let vote = el[0].votes.findIndex( val => val.userId === obj.userId)
    console.log('vote', vote)
    el[0].votes.splice(vote, 1)
    return newArr
}

export default deleteVote