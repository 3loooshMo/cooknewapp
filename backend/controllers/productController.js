import { conn } from "../utils/db.js";
import fs from 'fs'
import path from "path";
export const addProduct = async (req, res) => {

    try {
        const upload = [];
        let { path, originalname } = req.files[0];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        const sql = 'INSERT INTO `product` (`id`, `name`, `price`, `category`, `user`, `file_name`) VALUES (NULL, ?, ?, ?, ?,?);'
        await conn.query(sql, [req.body.name, req.body.price, req.body.category,req.body.user,newPath], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.protocol41) {
                upload.push((newPath.replace('upload/', '')))

                if (err) return res.json({ state: false, error: err });
                return res.status(200).json({ state: true })
            } else {
                console.log('result', result)
            }
        })

    } catch (e) {
        res.status(500).send("error")
    }
}


export const getProducts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `product`'
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, products: result })
            } else {
                return res.json({ state: false, error: "no data found" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'SELECT * FROM product WHERE id = ?'
        await conn.query(sql, [id], (err, result) => {
            if (err) return res.json({ state: false, error: err });

            if (result.length > 0) {

                return res.json({ state: true, product: result })
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }

}
export const getProductName = async (req, res) => {
    try {
        const sql = 'SELECT name FROM `product`'

        await conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });

            if (result.length > 0) {

                return res.json({ state: true, product: result })
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }

}
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'DELETE FROM `product` WHERE `product`.`id` = ?'

        await conn.query(sql, [id], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.protocol41) {
                return res.json({ state: true })
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}

export const editProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const sql = 'UPDATE `product` SET `name` = ?, `price` = ?, `category` = ? WHERE `product`.`id` = ' + id
        await conn.query(sql, [req.body.name, req.body.price, req.body.category], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.protocol41) {

                return res.json({ state: true })
            } else {
                console.log(result)
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}

export const getItems = async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'SELECT * FROM product WHERE category = ?'
        await conn.query(sql, [id], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, product: result })
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }

}
