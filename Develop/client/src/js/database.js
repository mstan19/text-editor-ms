import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database -done
export const putDb = async (id, content) => {
   // Create a connection to the database and picked the version we want to use
  const jateDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

   // Open up a specific object store
  const store = tx.objectStore('jate');

  // Get all data in the database
  const request = store.put({ id: id, value: content });
  const result = await request;
  console.log('data saved to the database', result);
  // console.error('putDb not implemented');
}


// TODO: Add logic for a method that gets all the content from the database -done
export const getDb = async () => {
   // Create a connection to the database and picked the version we want to use
   const jateDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges
   const tx = jateDb.transaction('jate', 'readonly');
 
   // Open up a specific object store
   const store = tx.objectStore('jate');
 
   // Get all data in the database
   const request = store.getAll();
 
   const result = await request;
   console.log('result.value', result);
   return result?.value;
  // console.error('getDb not implemented');
}


initdb();
