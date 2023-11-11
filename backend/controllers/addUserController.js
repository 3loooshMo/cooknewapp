import { conn } from '../utils/db.js'
export const addUserController = async (req, res) => {
    try {
        const sql = 'INSERT INTO `User` (`id`, `name`, `user_name`, `password`, `isAdmin`) VALUES (NULL, ?, ?, ?, ?);'
      
        conn.query(sql, [req.body.name, req.body.user_name, req.body.password, req.body.isAdmin], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            console.log((result))

            return res.json({ state: true, data: result })

        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
