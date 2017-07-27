const deleteProject = (arr, id) => {
  let newData = arr
  let element = newData.findIndex(el => el.id === id)
  newData.splice(element, 1)
  return newData
}
export default deleteProject