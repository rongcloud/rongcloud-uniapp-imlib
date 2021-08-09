export const statusColor = {
	0: '#19be6b',
	1: '#ff4949',
	2: '#2DB7F5',
	3: '#FF9900'
}

export const isObject = (val) => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export const isArray = (arr) => Object.prototype.toString.call(arr).indexOf('Array') !== -1