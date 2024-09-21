import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

export type User = {
  username: string;
  password: string;
};

export type Word = {
  word: string;
  definition: string;
  username: string;
  list: string;
};

export const openDatabase = async (databaseName: string): Promise<SQLiteDatabase> => {
  return await SQLite.openDatabaseAsync(databaseName,{});
};

export const deleteDatabase = async (databaseName: string): Promise<void> => {
  await SQLite.deleteDatabaseAsync(databaseName);
};

export const serializeDatabase = async (db: SQLiteDatabase): Promise<Uint8Array> => {
  return await db.serializeAsync();
};

export const deserializeDatabase = async (serializedData: Uint8Array): Promise<SQLiteDatabase> => {
  return await SQLite.deserializeDatabaseAsync(serializedData);
};

export const addDatabaseChangeListener = (listener: (event: SQLite.DatabaseChangeEvent) => void) => {
  return SQLite.addDatabaseChangeListener(listener);
};

export const createUserTable = async (db: SQLiteDatabase): Promise<void> => {
  const query = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`;
  await db.execAsync(query);
};

export const createWordTable = async (db: SQLiteDatabase): Promise<void> => {
  const query = `CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    definition TEXT NOT NULL,
    username TEXT NOT NULL,
    list TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username)
  )`;
  await db.execAsync(query);
};

export const createUser = async (db: SQLiteDatabase, users: User[]): Promise<void> => {
  const insertQuery = `INSERT OR REPLACE INTO users (username, password) values (?, ?)`;
  for (const user of users) {
    await db.runAsync(insertQuery, [user.username, user.password]);
  }
};

export const getUser = async (db: SQLiteDatabase): Promise<User[]> => {
  const result = await db.getAllAsync<User>('SELECT * FROM users');
  return result;
};

export const createWord = async (db: SQLiteDatabase, words: Word[]): Promise<void> => {
  const insertQuery = `INSERT OR REPLACE INTO words (word, definition, username, list) values (?, ?, ?, ?)`;
  for (const word of words) {
    await db.runAsync(insertQuery, [word.word, word.definition, word.username, word.list]);
  }
};

export const getWord = async (db: SQLiteDatabase): Promise<Word[]> => {
  const result = await db.getAllAsync<Word>('SELECT * FROM words');
  return result;
};

// Example of using the change listener
export const setupDatabaseChangeListener = (db: SQLiteDatabase) => {
  const subscription = addDatabaseChangeListener((event) => {
    console.log('Database changed:', event);
    // You can perform actions based on the change event here
  });

  // Remember to remove the listener when it's no longer needed
  // subscription.remove();
};