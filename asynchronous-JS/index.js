const fs = require("fs");
const superagent = require("superagent");

/**
 * @description This is the Callback Hell 
  fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Hei: ${data}`);
    superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    .end((err, res) => {
      if (err) return console.log(`Error: ${err.message}`);
      console.log(`Response: ${res.body.message}`);
      fs.writeFile(`${__dirname}/dog.txt`, res.body.message, (err, res) => {
        if (err) return console.log(`Write Error: ${err.message}`)
        console.log(`Write Success: ${res}`);
      });
    });
  });
 */

/**
 * @description Use promise
  fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Hei: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(`Response: ${res.body.message}`);
      fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err, res) => {
        if (err) return console.log(`Write Error: ${err.message}`);
        console.log(`Write Success`);
      });
    })
    .catch((err) => console.log(`Error: ${err.message}`));
});
 */

const readFilePro = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, res) => {
      if (err) return reject("would not be able to read file 🌚");
      return resolve(res);
    });
  });
};

const writeFilePro = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, {}, (err, res) => {
      if (err) return reject("would not be able to write file 🥺");
      return resolve(`Write Success`);
    });
  });
};

/**
 * @description Use chained mode
  readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
      console.log(`Key Word: ${data}`);
      return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then((data) => {
      console.log(`Response: ${data.body.message}`);
      return writeFilePro(`${__dirname}/dog-img.txt`, data.body.message);
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(`Error: ${err}`));
 */

/**
 * @description Use async/await
 */
const getDogImg = async (path) => {
  try {
    const data = await readFilePro(path);
    console.log(`Key Word: ${data}`);
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(`Response: ${res.body.message}`);
    await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
    console.log(`Write Success 🌝`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

getDogImg(`${__dirname}/dog.txt`);
