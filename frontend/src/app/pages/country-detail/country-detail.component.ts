import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CountryDetailInterface } from '../../core/interfaces/country-detail.interface';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  objectValues = Object.values;
  country: CountryDetailInterface | null = null;
  borders: { [key: string]: string } = {};
  cols: number = 2;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cols = (window.innerWidth <= 768) ? 1 : 2;
    this.route.params.subscribe(params => {
      this.loadCountryDetail(params['cca3']);
    });
  }

  loadCountryDetail(cca3: string): void {
    this.api.getCountryDetail(cca3).then(country => {
      this.country = country;
      if (country) console.log(country.languages);
      if (this.country && this.country.borders) {
        this.api.getCountriesNames(this.country.borders).then(borders => {
          this.borders = borders
        });
      }
    });
  }

  onResizeGrid(event: any) {
    this.cols = (event.target.innerWidth <= 768) ? 1 : 2;
  }

}
