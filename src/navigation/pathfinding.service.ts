// src/navigation/pathfinding.service.ts
import { Injectable } from '@nestjs/common';
import * as turf from '@turf/turf';
import { MapService } from '../map/map.service';
import { TrackingService } from '../tracking/tracking.service';

@Injectable()
export class PathfindingService {
  private graph: any;

  constructor(
    private readonly mapService: MapService,
    private readonly trackingService: TrackingService
  ) {
    this.buildGraph();
  }

  private buildGraph() {
    const mapData = this.mapService.getMapData();
    this.graph = { nodes: {}, edges: [] };

    // Extract all walkable areas (environment and zones)
    const walkableFeatures = mapData.features.filter(
      (feature: any) => 
        feature.properties.type === 'environment' || 
        feature.properties.type === 'zone'
    );

    // Create nodes at important points (corners, doors, etc.)
    walkableFeatures.forEach((feature: any) => {
      const coords = feature.geometry.coordinates[0];
      coords.forEach((coord: [number, number]) => {
        const nodeKey = `${coord[0]},${coord[1]}`;
        this.graph.nodes[nodeKey] = { 
          coord,
          properties: feature.properties
        };
      });
    });

    // Connect nodes with edges
    const nodeKeys = Object.keys(this.graph.nodes);
    for (let i = 0; i < nodeKeys.length; i++) {
      for (let j = i + 1; j < nodeKeys.length; j++) {
        const nodeA = this.graph.nodes[nodeKeys[i]];
        const nodeB = this.graph.nodes[nodeKeys[j]];
        const distance = turf.distance(nodeA.coord, nodeB.coord);
        
        // Only connect nearby nodes (adjust threshold as needed)
        if (distance < 0.02) { // ~20 meters
          this.graph.edges.push({
            from: nodeKeys[i],
            to: nodeKeys[j],
            weight: distance
          });
        }
      }
    }
  }

  async findPath(start: [number, number], end: [number, number]): Promise<any> {
    const startNode = this.findNearestNode(start);
    const endNode = this.findNearestNode(end);

    if (!startNode || !endNode) {
      throw new Error('Start or end point not in walkable area');
    }

    const path = this.aStar(startNode, endNode);
    return {
      path,
      distance: this.calculatePathDistance(path),
      instructions: this.generateInstructions(path),
      start: this.graph.nodes[startNode].coord,
      end: this.graph.nodes[endNode].coord
    };
  }

  async routeTo(destination: string, useCurrentPosition: boolean = true) {
    const destinationZone = this.mapService.findZoneByName(destination);
    if (!destinationZone) {
      throw new Error('Destination not found');
    }

    const destinationCenter = this.getPolygonCenter(destinationZone.geometry.coordinates[0]);
    const startPosition = useCurrentPosition 
      ? this.trackingService.getCurrentPosition()
      : null;

    if (!startPosition && useCurrentPosition) {
      throw new Error('Current position not available');
    }

    const start: [number, number] = startPosition
      ? [startPosition.longitude, startPosition.latitude]
      : [3.1745, 36.7048]; // Default start if no tracking

    return this.findPath(start, destinationCenter);
  }

  async findNearestPOI(point: [number, number], type?: string) {
    const pois = this.mapService.getPOIs();
    let nearest = null;
    let minDistance = Infinity;

    for (const poi of pois) {
      if (type && poi.properties.type !== type) continue;
      
      const poiPoint = this.getFeatureCenter(poi);
      const distance = turf.distance(point, poiPoint);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearest = {
          ...poi,
          distance,
          coordinates: poiPoint
        };
      }
    }

    return nearest;
  }

  private aStar(startNode: string, endNode: string): [number, number][] {
    const openSet = new Set([startNode]);
    const cameFrom: Record<string, string> = {};
    const gScore: Record<string, number> = {};
    const fScore: Record<string, number> = {};

    // Initialize scores
    for (const node in this.graph.nodes) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
    }

    gScore[startNode] = 0;
    fScore[startNode] = this.heuristic(startNode, endNode);

    while (openSet.size > 0) {
      const current = this.getLowestFScore(openSet, fScore);
      
      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.delete(current);

      for (const edge of this.graph.edges) {
        if (edge.from === current || edge.to === current) {
          const neighbor = edge.from === current ? edge.to : edge.from;
          const tentativeGScore = gScore[current] + edge.weight;

          if (tentativeGScore < gScore[neighbor]) {
            cameFrom[neighbor] = current;
            gScore[neighbor] = tentativeGScore;
            fScore[neighbor] = gScore[neighbor] + this.heuristic(neighbor, endNode);
            if (!openSet.has(neighbor)) {
              openSet.add(neighbor);
            }
          }
        }
      }
    }

    throw new Error('Path not found');
  }

  private heuristic(nodeA: string, nodeB: string): number {
    const coordA = this.graph.nodes[nodeA].coord;
    const coordB = this.graph.nodes[nodeB].coord;
    return turf.distance(coordA, coordB);
  }

  private findNearestNode(point: [number, number]): string | null {
    let minDistance = Infinity;
    let nearestNode: string | null = null;

    for (const nodeKey in this.graph.nodes) {
        const distance = turf.distance(point, this.graph.nodes[nodeKey].coord);
        console.log(`Checking node ${nodeKey}: Distance = ${distance}`);
        if (distance < minDistance) {
            minDistance = distance;
            nearestNode = nodeKey;
        }
    }

    console.log(`Nearest node to (${point}): ${nearestNode} at distance ${minDistance}`);
    return nearestNode; // Supprimer la limite de 0.02 temporairement pour debug
}


  private reconstructPath(cameFrom: Record<string, string>, current: string): [number, number][] {
    const path = [current];
    while (cameFrom[current]) {
      current = cameFrom[current];
      path.unshift(current);
    }
    
    return path.map(node => this.graph.nodes[node].coord);
  }

  private getLowestFScore(nodes: Set<string>, fScore: Record<string, number>): string {
    let lowest: string | null = null;
    let lowestScore = Infinity;

    for (const node of nodes) {
      if (fScore[node] < lowestScore) {
        lowestScore = fScore[node];
        lowest = node;
      }
    }

    return lowest!;
  }

  private calculatePathDistance(path: [number, number][]): number {
    let distance = 0;
    for (let i = 1; i < path.length; i++) {
      distance += turf.distance(path[i-1], path[i]);
    }
    return parseFloat(distance.toFixed(2));
  }

  private generateInstructions(path: [number, number][]): string[] {
    if (path.length < 2) return [];
    
    const instructions: string[] = [];
    let prevBearing = turf.bearing(path[0], path[1]);
    instructions.push(`Start facing ${this.getDirectionName(prevBearing)}`);
    
    for (let i = 2; i < path.length; i++) {
      const currentBearing = turf.bearing(path[i-1], path[i]);
      const angleDiff = ((currentBearing - prevBearing + 540) % 360) - 180;
      
      if (Math.abs(angleDiff) > 30) {
        instructions.push(
          `Turn ${angleDiff > 0 ? 'right' : 'left'} ${Math.round(Math.abs(angleDiff))}°`
        );
      }
      
      const segmentDistance = turf.distance(path[i-1], path[i], {units: 'meters'});
      instructions.push(`Walk ${segmentDistance.toFixed(1)} meters`);
      
      prevBearing = currentBearing;
    }
    
    instructions.push('You have arrived at your destination');
    return instructions;
  }

  private getDirectionName(bearing: number): string {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(((bearing % 360) / 45)) % 8;
    return directions[index];
  }

  private getPolygonCenter(coords: [number, number][]): [number, number] {
    const sum = coords.reduce((acc, [lng, lat]) => {
      acc.lng += lng;
      acc.lat += lat;
      return acc;
    }, { lng: 0, lat: 0 });
    
    return [sum.lng / coords.length, sum.lat / coords.length];
  }

  private getFeatureCenter(feature: any): [number, number] {
    if (feature.geometry.type === 'Point') {
      return feature.geometry.coordinates;
    }
    if (feature.geometry.type === 'LineString') {
      return this.getPolygonCenter(feature.geometry.coordinates);
    }
    return this.getPolygonCenter(feature.geometry.coordinates[0]);
  }
}