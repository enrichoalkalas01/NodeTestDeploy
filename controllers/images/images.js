const Path = require('path')

// Models
const ImagesModel = require('../../models/mongodb/Images')

exports.Find = async (req, res) => {
    await ImagesModel.find().then(response => {
        res.send({ message: 'successfull to get images', statusCode: 200, status: true, results: response })
    }).catch(err => {
        res.send({ message: 'failed to get images', statusCode: 500, status: false })
    })
}

exports.Create = async (req, res) => {
    if ( !req.files ) res.send({ message: 'failed to create images', statusCode: 400, status: false })
    else {
        let imageData = req.files.images
        if ( !imageData.mimetype.includes('image') ) res.send({ message: 'failed to create images', statusCode: 400, status: false })
        else {
            let newName = makeid(30) + imageData.mimetype.replace('image/', '.')
            let PathFolder = Path.join(__dirname, '../../', '/public/images/tester/')
            let ImagesSave = await imageData.mv(PathFolder + newName).then(response => true).catch(err => false)
            
            if ( !ImagesSave ) res.send({ message: 'failed to create images', statusCode: 500, status: false })
            else {
                const Images = new ImagesModel({ imagesName: newName, typeData: 'tester' })
                let ImagesSaveDB = await Images.save(Images).then(response => true).catch(err => false)
                if ( !ImagesSaveDB ) res.send({ message: 'failed to create images', statusCode: 500, status: false })
                else res.send({ message: 'success to create images', statusCode: 200, status: true, results: newName })
            }
        }
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}