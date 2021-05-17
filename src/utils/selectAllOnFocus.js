const selectAllOnFocus = () => {
  setTimeout(() => {
    document.execCommand('selectAll', false, null)
  }, 1)
}

export default selectAllOnFocus
