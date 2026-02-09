export const signUp = (db, userDetails) => {
  const { name, password } = userDetails;
  const insertStatement =
    `INSERT INTO user (name, password) VALUES (?, ?) RETURNING id`;
  const dbResponse = db.prepare(insertStatement).get(name, password);

  return dbResponse.id;
};

export const signIn = (db, userDetails) => {
  const { id, password } = userDetails;
  const selectStatement = `SELECT * FROM user WHERE id = ? AND password = ?`;
  const user = db.prepare(selectStatement).get(id, password);
  return user;
};

export const init = (db) => {
  db.exec(`CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    password text
    );
  `);
};
