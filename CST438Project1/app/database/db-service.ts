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
// Function to create practice words
export const createPracticeWord = async (db: SQLiteDatabase, words: Word[]): Promise<void> => {
  const insertQuery = `INSERT OR REPLACE INTO words (word, definition, username, list) values (?, ?, ?, 'practice')`;
  for (const word of words) {
    await db.runAsync(insertQuery, [word.word, word.definition, word.username]);
  }
};

// Function to create favorite words
export const createFavoriteWord = async (db: SQLiteDatabase, words: Word[]): Promise<void> => {
  const insertQuery = `INSERT OR REPLACE INTO words (word, definition, username, list) values (?, ?, ?, 'favorite')`;
  for (const word of words) {
    await db.runAsync(insertQuery, [word.word, word.definition, word.username]);
  }
};

// Function to get practice words
export const getPracticeWords = async (db: SQLiteDatabase, username: string): Promise<Word[]> => {
  const result = await db.getAllAsync<Word>('SELECT * FROM words WHERE username = ? AND list = ?', [username, 'practice']);
  return result;
};

// Function to get favorite words
export const getFavoriteWords = async (db: SQLiteDatabase, username: string): Promise<Word[]> => {
  const result = await db.getAllAsync<Word>('SELECT * FROM words WHERE username = ? AND list = ?', [username, 'favorite']);
  return result;
};