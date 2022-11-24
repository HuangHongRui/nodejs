const { set, get } = require('./index')

set('cccc', {a: 1})
get('cccc').then(data => {
  console.log('ffff', data)
})
