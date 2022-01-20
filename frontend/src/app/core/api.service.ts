import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CountryBasicInterface } from './interfaces/country-basic.interface';
import { CountryDetailInterface } from './interfaces/country-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  private async getQuery(query: string): Promise<any> {
    return await this.apollo.watchQuery<any>({
      query: gql`${query}`
    }).result();
  }

  public async getCountriesBasic(): Promise<CountryBasicInterface[]> {
    const GET_COUNTRIES_BASIC = `
          query {
            getCountriesBasic {
              name {
                common
              }
              cca3
              capital
              borders
              region
              area
              population
            }
          }
        `;

    let countries = (await this.getQuery(GET_COUNTRIES_BASIC)).data.getCountriesBasic;
    return countries.map((country: any) => ({ ...country, name: country.name.common, capital: (country.capital || []).join(' - '), borders: (country.borders || []).length }));
  }

  public async getCountriesNames(cca3: string[]): Promise<{ [key: string]: string }> {
    const GET_COUNTRIES_NAMES = `
          query {
            getCountriesNames (cca3: ["${cca3.join('", "')}"])
              {
              name {
                common
              }
              cca3
            }
          }
        `;

    let countries = (await this.getQuery(GET_COUNTRIES_NAMES)).data.getCountriesNames;
    return countries.reduce((dict: { [key: string]: string }, country: any) => {
      dict[country.cca3] = country.name.common;
      return dict;
    }, {});
  }

  public async getCountryDetail(cca3: string): Promise<CountryDetailInterface | null> {
    const GET_COUNTRY_DETAIL = `
          query {
            getCountryDetail (cca3: "${cca3}")
              {
              name {
                common
              }
              cca3
              independent
              unMember
              capital
              capital
              region
              subregion
              languages
              latlng
              landlocked
              borders
              area
              population
              flags {
                svg
              }
            }
          }
        `;
    try {
      let country = (await this.getQuery(GET_COUNTRY_DETAIL)).data.getCountryDetail;
      return { ...country, name: country.name.common, capital: (country.capital || []).join(' - ') }
    } catch (err: any) {
      return null;
    }

  }

}
