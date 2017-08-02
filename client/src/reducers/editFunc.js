const Modify = (arr, id, item) => {
  //console.log('EDIT FUNC', arr, id, item)
  const el = arr.findIndex(x => x.projectId === id)
  arr[el] = item
  return arr
}
export default Modify