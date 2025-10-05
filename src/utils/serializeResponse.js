const serializeResponse = (data) => {
  if (Array.isArray(data)) {
    return data.map(serializeResponse)
  }
  if (data && typeof data === 'object') {
    const serializedObject = {}
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'data' && typeof value === 'object') {
        Object.assign(serializedObject, serializeResponse(value))
      } else if (key === 'attributes' && typeof value === 'object') {
        Object.assign(serializedObject, serializeResponse(value))
      } else {
        serializedObject[key] = serializeResponse(value)
      }
    })
    return serializedObject
  }
  return data
}

export default serializeResponse
