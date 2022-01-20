export interface CountryDetailInterface {
  name: string,
  cca3: string,
  independent: boolean,
  unMember: boolean,
  capital: string,
  region: string,
  subregion: string,
  languages: {
    key: string,
    language: string
  }[],
  latlng: number[],
  landlocked: boolean,
  borders: string[],
  area: number,
  population: number,
  flags: {
    svg: string
  }
}
