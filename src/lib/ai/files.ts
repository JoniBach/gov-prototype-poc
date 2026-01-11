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
  return array.filter(item => item[key] !== value);
}


export function removeObjectsByKeys(
  array: any[],
  key: string,
  values: any[]
): any[] {
  return _.map(
    _.reject(array, item => _.includes(values, _.get(item, key))),
    item => {
      const result = { ...item };
      _.forEach(result, (value, propKey) => {
        if (_.isArray(value) && value.length > 0 && _.isObject(value[0])) {
          result[propKey] = removeObjectsByKeys(value, key, values);
        }
      });
      return result;
    }
  );
}

export function addJourneyToJourneysMap(journeyId: string): void {
  const journeysFilePath = path.resolve('e2e/journeys/journeys.ts');

  // Read the file
  const content = fs.readFileSync(journeysFilePath, 'utf-8');

  // Generate variable name: journey + camelCase(journeyId)
  const variableName = 'journey' + journeyId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

  // Import line
  const importLine = `import ${variableName} from "../../static/journeys/${journeyId}.json" with { type: "json" };`;

  // Split into lines
  const lines = content.split('\n');

  // Find the last import line
  let lastImportIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ') && lines[i].includes('from "../../static/journeys/')) {
      lastImportIndex = i;
    }
  }
  if (lastImportIndex === -1) {
    throw new Error('No journey imports found in journeys.ts');
  }

  // Insert the new import after the last import
  lines.splice(lastImportIndex + 1, 0, importLine);

  // Find the journeys object
  let objectStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export const journeys: Record<string, any> = {')) {
      objectStart = i + 1; // Line after the opening {
      break;
    }
  }
  if (objectStart === -1) {
    throw new Error('Journeys object not found');
  }

  // Find the last entry before the closing }
  let lastEntryIndex = -1;
  for (let i = objectStart; i < lines.length; i++) {
    if (lines[i].trim() === '};') {
      lastEntryIndex = i - 1;
      break;
    }
  }
  if (lastEntryIndex === -1) {
    throw new Error('Closing } of journeys object not found');
  }

  // Insert the new entry before the closing }
  const entryLine = `    "${journeyId}": ${variableName},`;
  lines.splice(lastEntryIndex + 1, 0, entryLine);

  // Write back to file
  fs.writeFileSync(journeysFilePath, lines.join('\n'));
}
