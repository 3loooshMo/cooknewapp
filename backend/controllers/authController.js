import { conn } from '../utils/db.js'
const userLogin = async (req, res) => {
    try {
        const sql = 'SELECT * FROM User WHERE user_name = ? and password = ?'
    
        conn.query(sql, [req.body.user_name, req.body.password], (err, result) => {
            if (err) return res.json({ loinState: false, error: err });
            if (result.length > 0) {
                const user = result[0].name;
                const user_name = result[0].user_name;
                const isAdmin = result[0].isAdmin;
                console.log(isAdmin)
                return res.json({ loginState: true,name:user, user_name: user_name, isAdmin: isAdmin })
            } else {
                return res.json({ loginState: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
const getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM User'
     
        conn.query(sql , (err, result) => {
            if (err) return res.json({ loinState: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, user: result})
            } else {
                return res.json({ loginState: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
const getUser = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const sql = 'SELECT * FROM User WHERE id = ?'
     
        conn.query(sql , [id],(err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, user: result})
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const sql = 'DELETE FROM `User` WHERE `User`.`id` = ?'
     
       await conn.query(sql , [id],(err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.protocol41) {
                return res.json({ state: true})
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}

const editUser = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
       const sql = 'UPDATE `User` SET `name` = ?, `user_name` = ?, `password` = ?, `isAdmin` = ? WHERE `User`.`id` = '+id
       await conn.query(sql , [req.body.name,req.body.user_name,req.body.password,req.body.isAdmin],(err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.protocol41) {
        
                return res.json({ state: true})
            } else {
                console.log(result)
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export {
    // userRegister,
    getUser,
    userLogin,
    getAllUsers,
    deleteUser,
    editUser
    // logout
}