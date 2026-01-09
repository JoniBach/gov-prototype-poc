import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export function addObjectToJson(filePath: string, newObject: any): void {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const jsonArray = JSON.parse(fileContent);
  
  if (!_.isArray(jsonArray)) {
    throw new Error('JSON file must contain an array');
  }
  
  const updatedArray = _.concat(jsonArray, newObject);
  fs.writeFileSync(absolutePath, JSON.stringify(updatedArray, null, 2));
}

export function addUniqueObjectToJson(filePath: string, newObject: any): void {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const jsonArray = JSON.parse(fileContent);
  
  if (!_.isArray(jsonArray)) {
    throw new Error('JSON file must contain an array');
  }
  
  const existingIndex = _.findIndex(jsonArray, { id: newObject.id });
  
  if (existingIndex !== -1) {
    jsonArray[existingIndex] = newObject;
  } else {
    jsonArray.push(newObject);
  }
  
  fs.writeFileSync(absolutePath, JSON.stringify(jsonArray, null, 2));
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
  const jsonArray = JSON.parse(fileContent);
  
  if (!_.isArray(jsonArray)) {
    throw new Error('JSON file must contain an array');
  }
  
  return _.find(jsonArray, { id }) || null;
}

export function fetchJsonFile(filePath: string): any {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
}

export function removeObjectByKey<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  value: any
): T[] {
  return _.reject(array, { [key]: value } as Partial<T>);
}


export function removeObjectsByKeys<T extends Record<string, any>>(
  array: T[],
  key: string,
  values: any[]
): T[] {
  return _.map(
    _.reject(array, item => _.includes(values, _.get(item, key))),
    item => {
      const result = { ...item };
      _.forEach(result, (value, propKey) => {
        if (_.isArray(value) && value.length > 0 && _.isObject(value[0])) {
          result[propKey as keyof T] = removeObjectsByKeys(value, key, values) as any;
        }
      });
      return result;
    }
  );
}
