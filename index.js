const { mkdir, writeFile, appendFile } = require("fs/promises");
const { existsSync } = require("fs");
const { faker } = require("@faker-js/faker");

const filePath = async () => {
  const folderPath = `${__dirname}/data`;
  const filePath = `${folderPath}/fakedata3.js`;

  const isfolder = existsSync(folderPath);
  const isfile = existsSync(filePath);

  if (!isfolder) {
    await mkdir(folderPath, { recursive: true });
  }
  if (!isfile) {
    await writeFile(filePath, " ");
    console.log("filePath existsSync: " + filePath);
  }
  return filePath;
};

const person = () => {
  const gender = faker.person.sex();
  const fname = faker.person.firstName(gender);
  const lname = faker.person.lastName(gender);
  const name = faker.person.fullName({
    firstName: fname,
    lastName: lname,
    sex: gender,
  });
  const image = faker.internet.avatar();
  const email = faker.internet.email();
  const phone = faker.phone.imei();
  const username = faker.internet.userName({
    firstName: fname,
    lastName: lname,
  });
  const address = faker.location.country();
  const city = faker.location.city();
  return {
    name,
    image,
    email,
    phone,
    username,
    address,
    city,
  };
};



(async () => {
  const filepath_per = await filePath();
  const persons = new Array();
  const n = 100;
  for (let i = 0; i < n; i++) {
    const data = person();
    persons.unshift(data);
    console.log(i);
    if (i === n - 1) {
      const personsString_conv = JSON.stringify(persons);
      await appendFile(filepath_per, personsString_conv);
      console.log(`${persons.length} : Document successfully`);
    }
  }
})();
