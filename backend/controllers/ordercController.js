import { conn } from "../utils/db.js";
export const addOrder = async (req, res) => {
    try {
        const sql = 'INSERT INTO `Order` (`id`, `name`, `price`, `count`,`category`,`order_id`, `user`,`date`) VALUES (NULL, ?, ?, ?,?,?, ?,?);'
        await conn.query(sql, [req.body.name, req.body.price, req.body.count, req.body.category, req.body.order_id, req.body.user, req.body.date], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            return res.status(200).json({ state: true, result: result })
        })

    } catch (e) {
        res.status(500).send("error")
    }
}
export const addOrderReport = async (req, res) => {
    try {
        const sql = 'INSERT INTO `OrderDetales` (`id`, `total_amount`, `payment_method`,`date`,`order_id`,`user`,`type`) VALUES (NULL, ?, ?, ?,?,?,?);'
        await conn.query(sql, [req.body.total_amount, req.body.payment_method, req.body.date, req.body.order_id, req.body.user, req.body.type], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            return res.status(200).json({ state: true, result: result })
        })

    } catch (e) {
        res.status(500).send("error")
    }
}
export const getOrdersByOrderId = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `Order` '
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {
                return res.json({ state: false, error: "no data found" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getOrdersByDate = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `Order` '
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {
                return res.json({ state: false, error: "no data found" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getOrdersByCategory = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `Order` WHERE category = ?';
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {
                return res.json({ state: false, error: "no data found" })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getOrderDetales = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `OrderDetales`'
        conn.query(sql, [req.body.name], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {
                return res.json({ state: false, error: result })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getOrdersDateBetween = async (req, res) => {

    try {
       console.log(req.params.date_one,'-',req.params.date_tow)
       const date_one = req.params.date_one;
       const date_tow = req.params.date_tow;
        const sql = 'SELECT id, name,user ,date, SUM(price) as price,SUM(count) as count FROM `Order` WHERE date BETWEEN ? AND ? GROUP BY name,user ORDER BY `Order`.`date` DESC;'
        conn.query(sql,[date_one,date_tow], (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {
                return res.json({ state: false, error: err })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
const date = new Date()
const dateNow = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
export const getPriceCountOrder = async (req, res) => {
    try {

        const sql = 'SELECT SUM(price) as price,SUM(count) as count FROM `Order` WHERE date = "'+dateNow+'";'
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {

                return res.json({ state: false, error: err })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}
export const getOrdersByName = async (req, res) => {
    try {

        const sql = 'SELECT id, name,user , SUM(price) as price,SUM(count) as count FROM `Order` WHERE date = "' + dateNow + '" GROUP BY name , user ORDER BY `Order`.`user` ASC;'
        conn.query(sql, (err, result) => {
            if (err) return res.json({ state: false, error: err });
            if (result.length > 0) {
                return res.json({ state: true, order: result })
            } else {

                return res.json({ state: false, error: err })
            }
        })

    } catch (e) {
        res.status(500).send("User error")
    }
}