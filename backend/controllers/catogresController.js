import { conn } from "../utils/db.js";
import fs from 'fs'
import path from "path";
export const addCategory = async (req, res) => {
    try {
        const upload = [];
        let { path,originalname } = req.files[0];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path +'.'+ ext;
        fs.renameSync(path, newPath)
        const sql = 'INSERT INTO `categories` (`id`, `category`,`file_name`) VALUES (NULL,?,?);'
        await conn.query(sql, [req.body.category,newPath], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if(result.protocol41){
           
            upload.push((newPath.replace('upload/','')))
            if (err) return res.json({ state: false, error: err });
            return res.status(200).json({ state: true })
            }else{
                console.log('result',result)
            }
        }
        
        )

    } catch (e) {
        res.status(500).send(e)
    }
}
export const getCategories = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `categories`'
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {

                return res.json({ state: true, categories: result })
            } else {
                return res.json({ state: false, error: "no data found" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getCategorie = async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'SELECT * FROM categories WHERE id = ?'

        await conn.query(sql, [id], (err, result) => {
            if (err) return res.json({ state: false, error: err });

            if (result.length > 0) {

                return res.json({ state: true, categorie: result })
            } else {
                return res.json({ state: false, error: "wrong" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const deleteCategorie = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const sql = 'DELETE FROM `categories` WHERE `categories`.`id` = ?'

        await conn.query(sql, [id], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            console.log(result)
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

export const editCategorie = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const sql = 'UPDATE `categories` SET `category` = ? WHERE `categories`.`id` = ' + id
        await conn.query(sql, [req.body.category], (err, result) => {
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
