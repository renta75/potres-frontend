import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Help } from '../../domain/help';
import { Need } from '../../domain/need';
import { HelpService } from '../../service/help.service';
import { NeedService } from '../../service/need.service';
import { BreadcrumbService } from '../../../breadcrumb.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public allNeeds: Need[];
  public allHelps: Help[];
  public latitude: number;
  public longitude: number;
  public redMarker: any;
  public greenMarker: any;
  public loaded = false;
  public mymap = document.getElementById('map');

  constructor(
    private needService: NeedService,
    private helpService: HelpService,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
        this.latitude = 45.8025756;
        this.longitude = 15.8875545;
        this.mapInit();
        this.loaded = true;

        this.needService.getAll().then((needs) => {
          this.allNeeds = needs;
          for (const need of this.allNeeds) {
            L.marker([need.locationLat, need.locationLng], {icon: this.redMarker})
            .addTo(this.mymap)
            .bindPopup(`<strong style="color: red;">${need.title}</strong><br>
                        ${need.description} <br>
                        <strong>${need.contact}</strong>`);
          }
        }).then(o => {
          this.breadcrumbService.setItems([
              { label: 'Karta', routerLink: ['/Map'] }
          ]);
          this.loaded = true;
        }).catch(err => console.log(err));

        this.helpService.getAll().then((helps) => {
          this.allHelps = helps;
          for (const help of this.allHelps) {
            L.marker([help.locationLat, help.locationLng], {icon: this.greenMarker})
            .addTo(this.mymap)
            .bindPopup(`<strong style="color: green;">${help.title}</strong><br>
                        ${help.description} <br>
                        <strong>${help.contact}</strong>`
                        );
          }
        }).catch(err => console.log(err));
  }

  mapInit() {
    this.mymap = L.map('mapid', {zoomControl: false}).setView([this.latitude, this.longitude], 8.3);
    L.control.zoom({position : 'bottomright'}).addTo(this.mymap);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    this.redMarker = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.greenMarker = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
}
