const db = require('../../config/db')

module.exports = {
    async all () {
        const results = await db.query(`
        SELECT * FROM orphanages
        `)
        return results.rows
    },
    async create(data, res){
        try{
            const query = `
            INSERT INTO orphanages (
                lat,
                lng,
                name,
                about,
                images,
                instructions,
                opening_hours,
                open_on_weekends,
                whatsapp
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `
            const values = [
                data.lat,
                data.lng,
                data.name,
                data.about,
                data.images.toString(),
                data.instructions,
                data.opening_hours,
                data.open_on_weekends,
                data.whatsapp
            ]

            await db.query(query, values)
            return true
        }catch(err){
            console.error(err)
            return false
        }
    },
    find(id) {
        return db.query(`SELECT * FROM orphanages WHERE id = $1`, [id])
    },
    delete(id){
        return db.query("DELETE FROM orphanages WHERE id = $1", [id])
    },
}

