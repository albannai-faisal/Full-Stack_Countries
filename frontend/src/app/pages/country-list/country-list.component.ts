import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../core/api.service';
import { CountryBasicInterface } from '../../core/interfaces/country-basic.interface';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'capital', 'region', 'borders', 'area', 'population'];
  dataSource!: MatTableDataSource<CountryBasicInterface>;

  nameList!: string[];
  controlName: FormControl = new FormControl();
  filteredNames!: Observable<string[]>;
  controlRegion: FormControl = new FormControl();
  regions!: string[];
  regionList: Map<string, string[]> = new Map<string, string[]>();

  constructor(private api: ApiService) {
    this.controlRegion.setValue([]);
  }

  ngOnInit() {
    this.api.getCountriesBasic().then(countries => {
      this.dataSource = new MatTableDataSource(countries);
      let names: string[] = [];
      countries.forEach((country: CountryBasicInterface) => {
        names.push(country.name);
        this.regionList.set(country.region, [country.name].concat((this.regionList.get(country.region) || [])));
      });

      this.nameList = names.sort();
      this.regions = Array.from(this.regionList.keys()).sort();
      this.filteredNames = this.controlName.valueChanges.pipe(
        startWith(''),
        map(_ => this._filter())
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: CountryBasicInterface, filter: string): boolean => {
        let query: { name: string, regions: string[] } = JSON.parse(filter);
        return data.name.toLowerCase().includes(query.name) && (query.regions.length ? query.regions.includes(data.region) : true);
      };
    });
  }

  updateTable(): void {
    const filter = { name: (this.controlName.value || '').trim().toLowerCase(), regions: this.controlRegion.value };
    this.dataSource.filter = JSON.stringify(filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _filter(): string[] {
    const filter = (this.controlName.value || '').toLowerCase();
    this.updateTable();
    if (!this.controlRegion.value.length)
      return this.nameList.filter((name: string) => name.toLowerCase().includes(filter));
    let names = Array.from(this.regionList.keys()).map((region: string) => this.controlRegion.value.includes(region) ? this.regionList.get(region) as string[] : []).flat();
    return names.filter((name: string) => name.toLowerCase().includes(filter));
  }

}
