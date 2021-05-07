const prohibitNewline = e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

export default prohibitNewline
