# fake person generat and folfer file create and save local

`npm install `
or
`yarn add`

# code example

##### Import modules

###### file name: index.js

---

```js
const { mkdir, writeFile, appendFile } = require("fs/promises");

const { existsSync } = require("fs");
const { faker } = require("@faker-js/faker");
```

##### folfer and file create function

<p> return file path</p>

```js
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
```

##### person generator function help faker module

```js
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
```

##### person function exicult loping 100 person created

```js
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
```
---
# folder structure

![alt](image/folder-structure.png)

# All Done
