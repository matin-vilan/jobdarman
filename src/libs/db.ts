// lib/data.js
import { EEntities } from "@/types/entities";
import fs from "fs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "db.json");

export const readData = (entity: EEntities) => {
  try {
    const jsonData = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(jsonData);

    return data[entity] || [];
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
};

export const writeData = <T>(entity: EEntities, newData: T) => {
  try {
    const jsonData = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(jsonData);

    data[entity] = [...data[entity], newData];

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data:", err);
  }
};

export const updateData = <T>(
  entity: EEntities,
  id: string | number,
  updatedFields: Partial<T>
) => {
  try {
    const jsonData = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(jsonData);

    const index = data[entity].findIndex((item: T) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with ID ${id} not found`);
    }

    data[entity][index] = { ...data[entity][index], ...updatedFields };

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error updating data:", err);
  }
};
