import axios from 'axios';
import { GraphQLScalarType } from 'graphql';
import { client } from '../../cache.js';
const URL_COUNTRIES = 'https://restcountries.com/v3.1';

const Languages = new GraphQLScalarType({
  name: 'Languages',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    return ast;
  }
});
const getCountriesBasic = async () => {
  let countries = await client.hVals('Country');
  if (countries.length) return countries.map(x => JSON.parse(x));

  let res = await axios.get(URL_COUNTRIES + '/all');
  countries = res.data

  await client.hSet('Country', countries.reduce((dict, country) => {
    dict[country.cca3] = JSON.stringify(country);
    return dict;
  }, {}));
  return countries;

};
const getCountriesNames = async ({ cca3 }) => {
  let countries = await client.hmGet('Country', cca3);
  return countries.map(x => JSON.parse(x));
}

const getCountryDetail = async ({ cca3 }) => {
  let country = await client.hGet('Country', cca3);
  if (country) return JSON.parse(country);

  let res = await axios.get(URL_COUNTRIES + `/alpha/${cca3}`);
  if (res.status == 404) return null;
  country = res.data[0];
  await client.hSet('Country', cca3, JSON.stringify(country));
  return country;
}

export default { Languages, getCountriesBasic, getCountriesNames, getCountryDetail };
