//--------------------------------------------------------------------------

// LEGACY TEST ROUTES FOR FEATURES REFERENCE !!!

// router.post('/test', upload.single("image"), (req, res) => {
//     try {
//         console.log("route reached!")
//         console.log(req.file)
//         console.log('////////////////////////////////////////////////////')

//         if (req.file) {
//             let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "sneak_pad" },
//                 function (error, result) {
//                     console.log(error, result);
//                 });

//             streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
//         }

//     } catch (error) {
//         console.log(error)
//         console.log("test route error")
//     }
// })

// // ANOTHER TEST ROUTE

// router.post('/test1', upload.array("image"), async (req, res) => {

//     let uploadFromBuffer = (req, index) => {

//         return new Promise((resolve, reject) => {

//             let cld_upload_stream = cloudinary.uploader.upload_stream(
//                 {
//                     folder: "sneak_pad"
//                 },
//                 (error, result) => {

//                     if (result) {
//                         resolve(result);
//                     } else {
//                         reject(error);
//                     }
//                 }
//             );

//             streamifier.createReadStream(req.files[index].buffer).pipe(cld_upload_stream);

//         });

//     };

//     let imgData = []

//     for (let i = 0; i < req.files.length; i++) {
//         let uploadedImg = await uploadFromBuffer(req, i);
//         console.log(uploadedImg)
//         let imgResult = {
//             img_name: uploadedImg.public_id,
//             img_url: uploadedImg.url
//         }
//         imgData.push(imgResult)
//     }

//     console.log(imgData)

//     let variants = JSON.parse(req.body.variantData)

//     // console.log(req.files)
//     console.log(variants)
//     res.json(req.body)

//     // console.log(...req.files)

// })

// // IMAGE DELETE TEST ROUTE

// router.post("/delImage", async (req, res) => {
//     const toDelete = await cloudinary.uploader.destroy("sneak_pad/kve5jti6ns6fqukaw85j")
//     console.log(toDelete)
//     // res.send("Delete Image route reached")
//     res.json(toDelete)
// })
