const fs = require("fs");

let countries = require("data/data.json");

import { Country } from "./interfaces";

function getCountries() {
  return countries.sort((a: Country, b: Country) => {
    if (a.population === null) {
      return 1;
    }

    if (b.population === null) {
      return -1;
    }

    if (a.population === b.population) {
      return 0;
    }

    return a.population < b.population ? 1 : -1;
  });
}

function getById(id: string) {
  return countries.find((element: Country) => element.id === id);
}

function update(id: string, body: Country) {
  let country = countries.find((element: Country) => element.id === id);

  // validation?

  country.population = Number(body.population);

  saveData();

  return country;
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: string) {
  // filter out deleted user and save

  countries = countries.filter((element: Country) => element.id !== id);

  saveData();
  return { countries: countries, message: `County ${id} deleted` };
}

// private helper functions

function saveData() {
  fs.writeFile(
    "data/data.json",
    JSON.stringify(countries, null, 2),
    (err: any) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        //console.log("The written file has the following contents:");
        //console.log(fs.readFileSync("./data.json", "utf8")); old data writeFile is async
      }
    }
  );
}

export { getCountries, getById, update, _delete };
