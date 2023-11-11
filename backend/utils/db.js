
import mysql from 'mysql'
export const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_food-app'
});

conn.connect((err) => {
    if (err) return console.log(err);
    console.log("conn")
})
