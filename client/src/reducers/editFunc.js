const Modify = (arr, id, item) => {
  const el = arr.findIndex(x => x.id === id)
  arr[el] = item
  return arr
}
export default Modify