import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { User } from '../(tabs)';

enablePromise(true);

//starts the database
export const getDBConnection = async () => {
  return openDatabase({ name: 'userData.db', location: 'default' });
};


//Table creation methods
export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${'users'}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};


//
//CRUD methods for each table
//


//Read method for sign in
export const getUser = async (db: SQLiteDatabase): Promise<User[]> => {
  try {
    const User: User[] = [];
    const results = await db.executeSql(`SELECT username as username,value FROM ${'users'}`);
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


//Create method for sign in
export const createUser = async (db: SQLiteDatabase, users: User[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${'users'}(rowid, value) values` +
    users.map(i => `('${i.username}', '${i.password}')`).join(',');

  return db.executeSql(insertQuery);
};


//Delete method for sign in
export const deleteUser = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${'users'} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};


//delete table (We won't use this)
export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${'users'}`;

  await db.executeSql(query);
};