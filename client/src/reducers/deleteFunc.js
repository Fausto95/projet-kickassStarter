const deleteProject = (arr, id) => {
  //console.log('DET FUNC', arr, id)
  let newData = arr
  let element = newData.findIndex(el => el.projectId === id)
  newData.splice(element, 1)
  return newData
}
export default deleteProject