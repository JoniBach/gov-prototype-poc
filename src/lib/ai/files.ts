import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export function addObjectToJson(filePath: string, newObject: any): void {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);
  
  if (!jsonData.journeys || !_.isArray(jsonData.journeys)) {
    throw new Error('JSON file must contain an object with a "journeys" array');
  }
  
  const updatedArray = _.concat(jsonData.journeys, newObject);
  jsonData.journeys = updatedArray;
  fs.writeFileSync(absolutePath, JSON.stringify(jsonData, null, 2));
}

export function createJson(filePath: string, data: any = []): void {
  const absolutePath = path.resolve(filePath);
  const dir = path.dirname(absolutePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
}


export function getObjectById(filePath: string, id: string): any | null {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);
  
  if (!jsonData.journeys || !_.isArray(jsonData.journeys)) {
    throw new Error('JSON file must contain an object with a "journeys" array');
  }
  
  return _.find(jsonData.journeys, { id }) || null;
}

export function fetchJsonFile(filePath: string): any {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
}
