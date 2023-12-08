const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const streamifier = require('streamifier');

// CLOUDINARY CONFIG / CREDENTIALS

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

// CLOUDINARY STORAGE LOCATION

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sneak_pad',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

// CONVERTING FILE BUFFER INTO STREAMABLE AND UPLOAD INTO CLOUDINARY

const uploadFromBuffer = (req, index) => {

    return new Promise((resolve, reject) => {

        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: "sneak_pad"
            },
            (error, result) => {

                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(req.files[index].buffer).pipe(cld_upload_stream);

    });

};

// DELETE FILE FROM CLOUDINARY

const deleteUpload = async (data) => {
    await cloudinary.uploader.destroy(data)
}

module.exports = {
    cloudinary,
    storage,
    uploadFromBuffer,
    deleteUpload,
}