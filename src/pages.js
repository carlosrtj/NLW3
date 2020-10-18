const Orphanages = require('./app/models/Orphanage')

module.exports = {
    index(req, res) {
        return res.render('index')
    },
    async orphanage(req, res) {
        try {
            const result = await Orphanages.find(req.query.id)
            const orphanage = result.rows[0]
            orphanage.images = orphanage.images.split(',')
            orphanage.firstImage = orphanage.images[0]
            
            if(orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false
            }else {
                orphanage.open_on_weekends = true
            }
            return res.render('orphanage', { orphanage })
        } catch (error) {
            console.log(error)
            res.send('Erro no banco de dados !')
        }
    },
    async orphanages(req, res) {
        try{
            const orphanages = await Orphanages.all()
            console.log(orphanages)
            return res.render('orphanages', { orphanages })
        }catch(err){
            console.log(err)
            res.send('Erro no banco de dados !')
        }
    },
    createOrphanage: (req, res) => {
        return res.render('create-orphanage')
    },
    async post(req, res) {
        try{
            const fields = req.body

            if(Object.values(fields).includes('')) {
                return res.render('create-orphanage', { error : "Preencha todos os campos !", 
                orphanage: req.body })
            }

            const err = await Orphanages.create(req.body, res)
            if(err){
                return res.render('create-orphanage', { success : "Cadastro bem sucedido !" })
            }else {
                return res.render('create-orphanage', { error : "Algum erro ocorreu no banco de dados !" })
            }
        } catch (error) {
            console.log(error)
        }
    }
}