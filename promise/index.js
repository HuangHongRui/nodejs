const fs = require('fs')
const path = require('path')

// Promise
const getFileContent = (fileName) => {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.join(__dirname, 'files', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(
        JSON.parse(data.toString())
      );
    })
  })
  return promise;
}

getFileContent('a.json').then(aData => {
  console.log('a data: ', aData, aData.next)
  return getFileContent(aData.next)
}).then(bData => {
  console.log('b data: ', bData)
  return getFileContent(bData.next)
}).then(cData => {
  console.log('c data: ', cData)
})

// STEP 1
// const fullFileName = path.join(__dirname, 'files', 'a.json');
// fs.readFile(fullFileName, (err, data) => {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   console.log(data.toString());
// })

// SETP 2 - CALLBACK HELL
// const getFileContent = (fileName, callback) => {
//   const fullFileName = path.join(__dirname, 'files', fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.log(err)
//       return;
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }
// getFileContent('a.json', aData => {
//   console.log('aData', aData)

//   getFileContent('b.json', bData => {
//     console.log('bData', bData)

//     getFileContent('c.json', cData => {
//       console.log('bData', cData)
//     })
//   })
// })
