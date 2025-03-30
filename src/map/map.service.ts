// src/map/map.service.ts (updated)
import { Injectable } from '@nestjs/common';
import * as turf from '@turf/turf';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MapService {
  private mapData: any;

  constructor() {
    this.loadMapData();
  }

  private loadMapData() {
    const mapFile = readFileSync(join(__dirname, '../../maps/env-example.geojson'), 'utf-8');
    this.mapData = JSON.parse(mapFile);
  }

  getMapData() {
    return this.mapData;
  }

  findZoneByName(name: string) {
    return this.mapData.features.find(
      (feature: any) => 
        feature.properties.type === 'zone' && 
        feature.properties.name === name
    );
  }

  getPOIs() {
    return this.mapData.features.filter(
      (feature: any) => feature.properties.type === 'poi'
    );
  }

  getEnvironment() {
    return this.mapData.features.find(
      (feature: any) => feature.properties.type === 'environment'
    );
  }

  // Add any additional map utility methods here
}