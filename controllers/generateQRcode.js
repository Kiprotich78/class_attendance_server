const QrCode = require('qrcode')


const generateQRcode = async (req, res)=>{
    try {
        const unitID = req.query.unitId; 
        const lessonID = req.query.lessonId; 

        if(!unitID || !lessonID){
            return res.status(400).json({Error: "Both unit id and lesson id are required"})
        }

        const jsonData = {unitID, lessonID};
        const jsonText = JSON.stringify(jsonData);

        const url = await QrCode.toDataURL(jsonText);
    
        res.send({
            msg: "success", 
            imgUrl: url, 
            htmlImgUrl: `<img src="${url}" alt="QR Code" />`
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = generateQRcode;
