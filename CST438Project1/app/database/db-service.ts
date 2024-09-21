import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { User } from '../(tabs)/index.tsx';
import { Word } from '../(tabs)/index.tsx';

enablePromise(true);

//starts the database
export const getDBConnection = async () => {
  return openDatabase({ name: 'userData.db', location: 'default' });
};


//User table creation method
export const createUserTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS 'users' (
        username TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL
    );`;
  await db.executeSql(query);

  await createUser(db, User['test', 'test']);
};

//Word table creation method
export const createWordTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS 'words' (
        word TEXT NOT NULL, definition TEXT NOT NULL, username TEXT NOT NULL, list TEXT NOT NULL
    );`;
  await db.executeSql(query);
};


//
//CRUD methods for each table
//


//Read method for sign in
export const getUser = async (db: SQLiteDatabase): Promise<User[]> => {
  try {
    const users: User[] = [];
    const results = await db.executeSql(`SELECT username FROM users`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index))
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get user !!!');
  }
};

//read method for word table
export const getWord = async (db: SQLiteDatabase): Promise<Word[]> => {
  try {
    const words: Word[] = [];
    const results = await db.executeSql(`SELECT word, definition, username, list FROM words`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        words.push(result.rows.item(index))
      }
    });
    return words;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get word !!!');
  }
};


//Create method for sign in
export const createUser = async (db: SQLiteDatabase, users: User[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${'users'}(username, password) values` +
    users.map(User => `('${User.username}', '${User.password}')`).join(',');

  return db.executeSql(insertQuery);
};


//create method for words table
export const createWord = async (db: SQLiteDatabase, words: Word[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${'words'}(word, definition, username, list) values` +
    words.map(Word => `('${Word.word}', '${Word.definition}', '${Word.username}', '${Word.list}')`).join(',');

  return db.executeSql(insertQuery);
};


//Delete method for sign in
export const deleteUser = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${'users'} where username = ${username}`;
  await db.executeSql(deleteQuery);
};

//Delete method for words list
export const deleteWord = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM words WHERE word = word`;
  await db.executeSql(deleteQuery);
};