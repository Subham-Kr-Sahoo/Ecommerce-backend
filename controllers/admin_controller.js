var db = require('../helpers/db_helper')
var helper = require('../helpers/helpers')
var multiparty = require('multiparty')
var fs = require('fs')
const { relativeTimeRounding } = require('moment-timezone')
const { json } = require('express')
var imageSavePath = "./public/img/"
var image_base_url = helper.ImagePath()

const msg_success = "Successful";
const msg_failure = "Fail";


module.exports.controller = (app,io,socket_list)=>{
    
    const msg_invaliduser = "Invalid Username and Passwod"
    const msg_already_register = "This email is already registered"
    const msg_already_added = "this product is already added"

    const msg_brand_added = "Brand Added Successfully"
    const msg_brand_Updated = "Brand Updated Successfully"
    const msg_brand_delete = "Brand Deleted Successfully"

    const msg_Category_added = "Category Added Successfully"
    const msg_Category_Updated = "Category Updated Successfully"
    const msg_Category_delete = "Category Deleted Successfully"

    const msg_Type_added = "Type Added Successfully"
    const msg_Type_Updated = "Type Updated Successfully"
    const msg_Type_delete = "Type Deleted Successfully"

    const msg_Product_added = "Product Added Successfully"
    const msg_Product_Updated = "Product Updated Successfully"
    const msg_Product_delete = "Product Deleted Successfully"

    const msg_Nutrition_added = "Nutrition Added Successfully"
    const msg_Nutrition_Updated = "Nutrition Updated Successfully"
    const msg_Nutrition_delete = "Nutrition Deleted Successfully"

    const msg_Image_added = "Product Image Added Successfully"
    const msg_Image_delete = "Product Image Deleted Successfully"

    const msg_Zone_added = "Zone Added Successfully"
    const msg_Zone_Updated = "Zone Updated Successfully"
    const msg_Zone_delete = "Zone Deleted Successfully"

    const msg_Area_added = "Area Added Successfully"
    const msg_Area_Updated = "Area Updated Successfully"
    const msg_Area_delete = "Area Deleted Successfully"

    const msg_offer_added = "offer added Successfully.";
    const msg_offer_delete = "offer deleted Successfully.";

    const msg_promo_code_added = "promo code added Successfully.";
    const msg_promo_code_update = "promo code updated Successfully.";
    const msg_promo_code_delete = "promo code deleted Successfully.";

    app.post('/api/admin/login', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["email", "password", "device_token"], () => {

            var authToken = helper.createRequestToken();
            db.query("UPDATE `user_details` SET `auth_token` = ?, `device_token` = ?, `modify_date` = NOW() WHERE `user_type` = ? AND `email` = ? AND `password` = ? AND `status` = ? ", [authToken, reqObj.device_token, "2", reqObj.email, reqObj.password, "1"], (err, result) => {

                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if (result.affectedRows > 0) {

                    db.query('SELECT `user_id`, `username`, `name`, `email`, `mobile`, `mobile_code`, `auth_token`, `created_date` FROM `user_details` WHERE `email` = ? AND `password` = ? AND `status` = "1" ', [reqObj.email, reqObj.password], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (result.length > 0) {
                            res.json({
                                'status': '1',
                                'payload': result[0],
                                'message': msg_success
                            })
                        } else {
                            res.json({
                                'status': '0',
                                'message': msg_invaliduser
                            })
                        }


                    })

                } else {
                    res.json({
                        'status': '0',
                        'message': msg_invaliduser
                    })
                }
            })
        })
    })

     app.post('/api/admin/brand_add',(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        helper.CheckParameterValid(res,reqObj,["brand_name"],()=>{
            checkAccessToken(req.headers,res,(uObj) =>{
            db.query("SELECT `brand_id`, `brand_name` FROM `brand_detail` WHERE `brand_name` = ? AND `status` = ?",[reqObj.brand_name,"1"],(err,result)=>{
                if(err){
                    helper.ThrowHtmlError(err,res);
                    return
                }
                if(result.length > 0){
                    res.json({"status":"1","payload":result[0],"message":msg_already_added})
                }else{
                    db.query("INSERT INTO `brand_detail`(`brand_name`,`created_date`,`modify_date`) VALUES (?,NOW(),NOW())",[reqObj.brand_name],(err,result)=>{
                        if(err){
                            helper.ThrowHtmlError(err,res);
                            return
                        }
                        if(result){
                            res.json({"status":"1","payload":{
                                "brand_id" : result.insertId,
                                "brand_name" : reqObj.brand_name
                            },"message":msg_brand_added})
                        }else{
                            res.json({"status":"0","message":msg_failure})
                        }
                    })
                }
            })
        },"2")
        })
    })

    app.post('/api/admin/brand_update',(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        helper.CheckParameterValid(res,reqObj,["brand_id","brand_name"],()=>{
            checkAccessToken(req.headers,res,(uObj) =>{
            
                    db.query("UPDATE `brand_detail` SET `brand_name`= ? , `modify_date` = NOW() WHERE `brand_id` = ? AND `status` = ?",[reqObj.brand_name,reqObj.brand_id,"1"],(err,result)=>{
                        if(err){
                            helper.ThrowHtmlError(err,res);
                            return
                        }
                        if(result.affectedRows > 0){
                            res.json({"status":"1","message":msg_brand_Updated})
                        }else{
                            res.json({"status":"0","message":msg_failure})
                        }
                    })
            },"2")
        })
    })

    app.post('/api/admin/brand_delete',(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        helper.CheckParameterValid(res,reqObj,["brand_id"],()=>{
            checkAccessToken(req.headers,res,(uObj) =>{
            
                    db.query("UPDATE `brand_detail` SET `status`= ? , `modify_date` = NOW() WHERE `brand_id` = ? AND `status` = ? ",["2",reqObj.brand_id,"1"],(err,result)=>{
                        if(err){
                            helper.ThrowHtmlError(err,res);
                            return
                        }
                        if(result.affectedRows > 0){
                            res.json({"status":"1","message":msg_brand_delete})
                        }else{
                            res.json({"status":"0","message":msg_failure})
                        }
                    })
            },"2")
        })
    })

    app.post('/api/admin/brand_list',(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        checkAccessToken(req.headers,res,(uObj) =>{
            db.query("SELECT `brand_id`, `brand_name` FROM `brand_detail` WHERE `status` = ?",["1"],(err,result)=>{
                if(err){
                    helper.ThrowHtmlError(err,res);
                    return
                }
                res.json({"status":"1","payload":result})
            });
        },"2")
    })

    app.post('/api/admin/product_category_add',(req,res)=>{
        var form = new multiparty.Form()
        checkAccessToken(req.headers,res,(uObj) => {
            form.parse(req,(err,reqObj,files) => {
                if(err){
                    helper.ThrowHtmlError(err,res);
                    return
                }
                helper.Dlog("-----------Parameter----------")
                helper.Dlog(reqObj)
                helper.Dlog("----------Files---------")
                helper.Dlog(files)

                helper.CheckParameterValid(res,reqObj,["cat_name","color"],()=>{
                    helper.CheckParameterValid(res,files,["image"],()=>{
                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".")+1);
                        var imageFileName = "category/" + helper.fileNameGenerate(extension);
                        var newPath = imageSavePath+imageFileName;

                        fs.rename(files.image[0].path , newPath ,(err)=>{
                            if(err){
                                helper.ThrowHtmlError(err,res)
                                return 
                            }
                            else{
                                db.query("INSERT INTO `category_details`(`cat_name`,`image`,`color`,`create_date`,`modify_date`) VALUES(?,?,?,NOW(),NOW())",[reqObj.cat_name[0],imageFileName,reqObj.color[0]],(err,result)=>{
                                    if(err){
                                        helper.ThrowHtmlError(err,res);
                                        return
                                    }
                                    if(result){
                                        res.json({"status":"1","payload":{
                                            "cat_id" : result.insertId,
                                            "cat_name" : reqObj.cat_name[0],
                                            "color" : reqObj.color[0],
                                            "image":helper.ImagePath() + imageFileName
                                        },"message": msg_Category_added})
                                    }else{
                                        res.json({"status":"0","message":msg_failure})
                                    }
                                })
                            }
                        })
                    })
                })
            })
        })
    })

    app.post('/api/admin/product_category_update',(req,res)=>{
        var form = new multiparty.Form()
        checkAccessToken(req.headers,res,(uObj) => {
            form.parse(req,(err,reqObj,files) => {
                if(err){
                    helper.ThrowHtmlError(err,res);
                    return
                }
                helper.Dlog("-----------Parameter----------")
                helper.Dlog(reqObj)
                helper.Dlog("----------Files---------")
                helper.Dlog(files)

                helper.CheckParameterValid(res,reqObj,["cat_id","cat_name","color"],()=>{
                    var condition= "";
                    var imageFileName = "";
                    if(files.image != undefined || files.image != null){
                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".")+1);
                        imageFileName = "category/" + helper.fileNameGenerate(extension);
                        var newPath = imageSavePath+imageFileName;

                        condition ="`image` = '"+imageFileName+"',";
                        fs.rename(files.image[0].path,newPath,(err)=>{
                            if(err){
                                helper.ThrowHtmlError(err);
                                return
                            }else{

                            }
                        })
                    }
                    db.query("UPDATE `category_details` SET `cat_name`=?,"+condition+"`color`= ? ,`modify_date`= NOW() WHERE `cat_id` = ? AND `status` = ?",[reqObj.cat_name[0],reqObj.color[0],reqObj.cat_id[0],"1"],(err,result)=>{
                        if(err){
                            helper.ThrowHtmlError(err,res);
                            return
                        }
                        if(result){
                            res.json({"status":"1","payload":{
                                "cat_id" : parseInt(reqObj.cat_id[0]),
                                "cat_name" : reqObj.cat_name[0],
                                "color" : reqObj.color[0],
                                "image":helper.ImagePath() + imageFileName
                            },"message":msg_Category_Updated});
                        }
                        else{
                            res.json({"status":"0","message":msg_failure});
                        }
                    })
                })
            })
        })
    })

    app.post('/api/admin/product_category_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["cat_id"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `category_details` SET `status`= ?, `modify_date` = NOW() WHERE `cat_id`= ? AND `status` = ? ", ["2", reqObj.cat_id,"1"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({"status": "1", "message": msg_Category_delete});
                    }
                    else {
                        res.json({ "status": "0", "message": msg_failure })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/product_category_list',(req,res)=>{
        helper.Dlog(req.body);
        var body = req.body;
        checkAccessToken(req.headers,res,(uObj)=>{
            db.query("SELECT `cat_id`, `cat_name`, (CASE WHEN `image` != '' THEN CONCAT ('" +helper.ImagePath()+ "','',`image`) ELSE `image` END) AS `image`, `color` FROM `category_details` WHERE `status` = ?",["1"],(err,result)=>{
                if(err){
                    helper.ThrowHtmlError(err,res)
                    return
                }
                res.json({"status":"1","payload":result})
            })
        },"2")
    })

    app.post("/api/admin/product_type_add", (req, res) => {
        var form = new multiparty.Form();

        checkAccessToken(req.headers, res, (uObj) => {

            form.parse(req, (err, reqObj, files) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                helper.Dlog("---------- Parameter ----")
                helper.Dlog(reqObj)
                helper.Dlog("---------- Files ----")
                helper.Dlog(files)

                helper.CheckParameterValid(res, reqObj, ["type_name", "color"], () => {
                    helper.CheckParameterValid(res, files, ["image"], () => {
                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);
                        var imageFileName = "type/" + helper.fileNameGenerate(extension);
                        var newPath = imageSavePath + imageFileName;

                        fs.rename(files.image[0].path, newPath, (err) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return
                            } else {
                                db.query("INSERT INTO `type_detail`( `type_name`, `image`, `color`, `created_date`, `modify_date`) VALUES  (?,?,?, NOW(), NOW())", [
                                    reqObj.type_name[0], imageFileName, reqObj.color[0]
                                ], (err, result) => {

                                    if (err) {
                                        helper.ThrowHtmlError(err, res);
                                        return;
                                    }

                                    if (result) {
                                        res.json({
                                            "status": "1", "payload": {
                                                "type_id": result.insertId,
                                                "type_name": reqObj.type_name[0],
                                                "color": reqObj.color[0],
                                                "image": helper.ImagePath() + imageFileName,
                                            }, "message": msg_Type_added
                                        });
                                    } else {
                                        res.json({ "status": "0", "message": msg_failure })
                                    }

                                })
                            }
                        })
                    })
                })

            })

        })
    })

    app.post("/api/admin/product_type_update", (req, res) => {
        var form = new multiparty.Form();

        checkAccessToken(req.headers, res, (uObj) => {

            form.parse(req, (err, reqObj, files) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                helper.Dlog("---------- Parameter ----")
                helper.Dlog(reqObj)
                helper.Dlog("---------- Files ----")
                helper.Dlog(files)

                helper.CheckParameterValid(res, reqObj, ["type_id", "type_name", "color"], () => {

                    var condition = "";
                    var imageFileName = "";

                    if (files.image != undefined || files.image != null) {
                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);

                        imageFileName = "type/" + helper.fileNameGenerate(extension);
                        var newPath = imageSavePath + imageFileName;

                        condition = " `image` = '" + imageFileName + "', ";
                        fs.rename(files.image[0].path, newPath, (err) => {
                            if (err) {
                                helper.ThrowHtmlError(err);
                                return
                            } else {

                            }
                        })
                    }


                    db.query("UPDATE `type_detail` SET `type_name`=?," + condition + " `color`=?,`modify_date`=NOW() WHERE `type_id`= ? AND `status` = ? ", [
                        reqObj.type_name[0], reqObj.color[0], reqObj.type_id[0], "1"
                    ], (err, result) => {

                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return;
                        }

                        if (result) {
                            res.json({
                                "status": "1", "payload": {
                                    "type_id": parseInt(reqObj.type_id[0]),
                                    "type_name": reqObj.type_name[0],
                                    "color": reqObj.color[0],
                                    "image": helper.ImagePath() + imageFileName,
                                }, "message": msg_Type_Updated
                            });
                        } else {
                            res.json({ "status": "0", "message":msg_failure})
                        }

                    })
                })

            })

        })
    })

    app.post('/api/admin/product_type_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["type_id"], () => {

            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `type_detail` SET `status`= ?, `modify_date` = NOW() WHERE `type_id`= ? ", [
                    "2", reqObj.type_id,
                ], (err, result) => {

                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }

                    if (result.affectedRows > 0) {
                        res.json({
                            "status": "1", "message": msg_Type_delete
                        });
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }

                })
            }, "2")
        })
    })

    app.post('/api/admin/product_type_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (uObj) => {
            db.query("SELECT `type_id`, `type_name`,  (CASE WHEN `image` != '' THEN CONCAT('" + helper.ImagePath() + "','',`image`)  ELSE `image` END) AS `image` , `color` FROM `type_detail` WHERE `status`= ? ", [
                "1"
            ], (err, result) => {

                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }

                res.json({
                    "status": "1", "payload": result
                });
            })
        }, "2")
    })

    app.post("/api/admin/product_add", (req, res) => {
        var form = new multiparty.Form();

        checkAccessToken(req.headers, res, (uObj) => {

            form.parse(req, (err, reqObj, files) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                helper.Dlog("---------- Parameter ----")
                helper.Dlog(reqObj)
                helper.Dlog("---------- Files ----")
                helper.Dlog(files)

                helper.CheckParameterValid(res, reqObj, ["name", "detail", "cat_id", "brand_id", "type_id", "unit_name", "unit_value", "nutrition_weight", "price", "nutrition_data"], () => {
                    helper.CheckParameterValid(res, files, ["image"], () => {
                        var imageNamePathArr = []
                        var fullImageNamePathArr = [];
                        files.image.forEach(imageFile => {
                            var extension = imageFile.originalFilename.substring(imageFile.originalFilename.lastIndexOf(".") + 1);
                            var imageFileName = "product/" + helper.fileNameGenerate(extension);

                            imageNamePathArr.push(imageFileName);
                            fullImageNamePathArr.push(helper.ImagePath() + imageFileName);
                            saveImage(imageFile, imageSavePath + imageFileName);
                        });

                        helper.Dlog(imageNamePathArr);
                        helper.Dlog(fullImageNamePathArr);

                        db.query("INSERT INTO `product_detail`(`cat_id`, `brand_id`, `type_id`, `name`, `detail`, `unit_name`, `unit_value`, `nutrition_weight`, `price`, `created_date`, `modify_date`) VALUES (?,?,?, ?,?,?, ?,?,?, NOW(), NOW() ) ", [reqObj.cat_id[0], reqObj.brand_id[0], reqObj.type_id[0], reqObj.name[0], reqObj.detail[0], reqObj.unit_name[0], reqObj.unit_value[0], reqObj.nutrition_weight[0], reqObj.price[0]], (err, result) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return
                            }

                            if (result) {

                                var nutritionInsertData = []

                                var nutritionDataArr = JSON.parse(reqObj.nutrition_data[0])

                                nutritionDataArr.forEach(nObj => {
                                    nutritionInsertData.push([result.insertId, nObj.nutrition_name, nObj.nutrition_value]);
                                });

                                if (nutritionDataArr.length > 0) {
                                    db.query("INSERT INTO `nutrition_detail`(`prod_id`, `nutrition_name`, `nutrition_value`) VALUES ? ", [nutritionInsertData], (err, nResult) => {
                                        if (err) {
                                            helper.ThrowHtmlError(err, res);
                                            return
                                        }

                                        if (nResult) {
                                            helper.Dlog("nutrition Insert success");
                                        } else {
                                            helper.Dlog("nutrition Insert fail");
                                        }


                                    })
                                }

                                var imageInsertArr = []

                                imageNamePathArr.forEach(imagePath => {
                                    imageInsertArr.push([result.insertId, imagePath]);
                                });

                                db.query("INSERT INTO `image_detail`(`prod_id`, `image`) VALUES ? ", [imageInsertArr], (err, iResult) => {
                                    if (err) {
                                        helper.ThrowHtmlError(err, res);
                                        return
                                    }

                                    if (iResult) {
                                        helper.Dlog("image Insert success");
                                    } else {
                                        helper.Dlog("image Insert fail");
                                    }

                                })


                                res.json({
                                    "status": "1", "message": msg_Product_added
                                });

                            } else {
                                res.json({ "status": "0", "message": msg_failure })
                            }
                        })


                    })
                })

            })

        })
    })

    app.post("/api/admin/product_update",(req,res)=> {
        helper.Dlog(req.body)
        var reqObj = req.body

        helper.CheckParameterValid(res,reqObj,["prod_id","name","detail","cat_id","brand_id","type_id","unit_name","unit_value","nutrition_weight","price"],()=>{
            checkAccessToken(req.headers,res,(uObj)=>{
                db.query("UPDATE `product_detail` SET `cat_id`= ? ,`brand_id`= ? ,`type_id`= ? ,`name`= ?,`detail`= ?,`unit_name`= ?,`unit_value`= ?,`nutrition_weight`= ?,`price`= ? WHERE `prod_id` = ? AND `status`= ?",[reqObj.cat_id,reqObj.brand_id,reqObj.type_id,reqObj.name,reqObj.detail,reqObj.unit_name,reqObj.unit_value,reqObj.nutrition_weight,reqObj.price,reqObj.prod_id,"1"],(err,result)=>{
                    if(err){
                        helper.ThrowHtmlError(err,res)
                        return
                    }
                    if(result.affectedRows > 0){
                        res.json({"status":"1","message":msg_Product_Updated})
                    }
                    else{
                        res.json({"status":"0","message":msg_failure})
                    }
                })
            },"2")
        })
    })

    app.post("/api/admin/product_delete",(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        helper.CheckParameterValid(res,reqObj,["prod_id"],()=>{
            checkAccessToken(req.headers,res,(uObj)=>{
                db.query("UPDATE `product_detail` SET `status`= ?,`modify_date`= NOW() WHERE `status`= ? AND `prod_id`= ?",["2","1",reqObj.prod_id],(err,result)=>{
                    if(err){
                        helper.ThrowHtmlError(err,res)
                        return
                    }
                    if(result.affectedRows > 0){
                        res.json({"status":"1","message":msg_Product_delete})
                    }
                    else{
                        res.json({"status":"0","message":msg_failure})
                    }
                })
            },"2")
        })
    })

    app.post("/api/admin/product_nutrition_add",(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body

        helper.CheckParameterValid(res,reqObj,["prod_id","nutrition_name","nutrition_value"],()=>{
            checkAccessToken(req.headers,res,(uObj)=>{
                db.query("INSERT INTO `nutrition_detail`(`prod_id`, `nutrition_name`, `nutrition_value`, `created_date`, `modify_date`) VALUE (?,?,?,NOW(),NOW())",[reqObj.prod_id,reqObj.nutrition_name,reqObj.nutrition_value],(err,result)=>{
                    if(err){
                        helper.ThrowHtmlError(err,res);
                        return
                    }
                    if(result){
                        res.json({"status":"1","message":msg_Nutrition_added})
                    }
                    else{
                        res.json({"status":"0","message":msg_failure})
                    }
                })
            },"2")
        })

    })

    app.post('/api/admin/product_nutrition_update', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["prod_id", "nutrition_id", "nutrition_name", "nutrition_value"], () => {

            checkAccessToken(req.headers, res, (uObj) => {

                db.query("UPDATE `nutrition_detail` SET `nutrition_name`= ?,`nutrition_value`= ?, `modify_date`= NOW() WHERE  `prod_id`= ? AND `nutrition_id` = ? AND `status` = ? ", [
                    reqObj.nutrition_name, reqObj.nutrition_value, reqObj.prod_id, reqObj.nutrition_id, "1"
                ], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({"status": "1", "message": msg_Nutrition_Updated});
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }

                })
            }, "2")
        })
    })

    app.post("/api/admin/product_nutrition_delete",(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        helper.CheckParameterValid(res,reqObj,["prod_id","nutrition_id"],()=>{
            checkAccessToken(req.headers,res,(uObj)=>{
                db.query("UPDATE `nutrition_detail` SET `status`= ?,`modify_date`= NOW() WHERE `status`= ? AND `prod_id`= ? AND `nutrition_id` = ?" ,["2","1",reqObj.prod_id,reqObj.nutrition_id],(err,result)=>{
                    if(err){
                        helper.ThrowHtmlError(err,res)
                        return
                    }
                    if(result.affectedRows > 0){
                        res.json({"status":"1","message":msg_Nutrition_delete})
                    }
                    else{
                        res.json({"status":"0","message":msg_failure})
                    }
                })
            },"2")
        })
    })

    app.post("/api/admin/product_image_add", (req, res) => {
        var form = new multiparty.Form();

        checkAccessToken(req.headers, res, (uObj) => {

            form.parse(req, (err, reqObj, files) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                helper.Dlog("---------- Parameter ----")
                helper.Dlog(reqObj)
                helper.Dlog("---------- Files ----")
                helper.Dlog(files)

                helper.CheckParameterValid(res, reqObj, ["prod_id"], () => {
                    helper.CheckParameterValid(res, files, ["image"], () => {
                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);

                        var imageFileName = "product/" + helper.fileNameGenerate(extension);
                        var newPath = imageSavePath + imageFileName;

                        fs.rename(files.image[0].path, newPath, (err) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return
                            } else {
                                db.query("INSERT INTO `image_detail`( `prod_id`, `image`, `created_date`, `modify_date`) VALUES  (?,?, NOW(), NOW())", [
                                    reqObj.prod_id[0], imageFileName
                                ], (err, result) => {

                                    if (err) {
                                        helper.ThrowHtmlError(err, res);
                                        return;
                                    }

                                    if (result) {
                                        res.json({
                                            "status": "1", "message": msg_Image_added
                                        });
                                    } else {
                                        res.json({ "status": "0", "message": msg_failure })
                                    }

                                })
                            }
                        })
                    })
                })

            })

        })
    })

    app.post("/api/admin/product_image_delete",(req,res)=>{
        helper.Dlog(req.body)
        var reqObj = req.body
        helper.CheckParameterValid(res,reqObj,["prod_id","img_id"],()=>{
            checkAccessToken(req.headers,res,(uObj)=>{
                db.query("UPDATE `image_detail` SET `status`= ?,`modify_date`= NOW() WHERE `status`= ? AND `prod_id`= ? AND `img_id` = ?" ,["2","1",reqObj.prod_id,reqObj.img_id],(err,result)=>{
                    if(err){
                        helper.ThrowHtmlError(err,res)
                        return
                    }
                    if(result.affectedRows > 0){
                        res.json({"status":"1","message":msg_Image_delete})
                    }
                    else{
                        res.json({"status":"0","message":msg_failure})
                    }
                })
            },"2")
        })
    })

    app.post('/api/admin/product_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;


        checkAccessToken(req.headers, res, (uObj) => {
            db.query("SELECT `pd`.`prod_id`, `pd`.`cat_id`, `pd`.`brand_id`, `pd`.`type_id`, `pd`.`name`, `pd`.`detail`, `pd`.`unit_name`, `pd`.`unit_value`, `pd`.`nutrition_weight`, `pd`.`price`, `pd`.`created_date`, `pd`.`modify_date`, `cd`.`cat_name`, IFNULL( `bd`.`brand_name`, '' ) AS `brand_name` , `td`.`type_name`, (CASE WHEN `imd`.`image` != '' THEN CONCAT('" + image_base_url + "', '', `imd`.`image`) ELSE '' END ) AS `image`, IFNULL (`od`.`price`, `pd`.`price`) AS `offer_price`,  AVG( CASE WHEN `rd`.`rate` IS NOT NULL THEN `rd`.`rate` ELSE 5.0 END ) AS `avg_rating` FROM `product_detail` AS  `pd` " +
                "INNER JOIN `category_details` AS `cd` ON `pd`.`cat_id` = `cd`.`cat_id` " +
                "LEFT JOIN `brand_detail` AS `bd` ON `pd`.`brand_id` = `bd`.`brand_id` " +
                "LEFT JOIN `offer_detail` AS `od` ON `od`.`prod_id` = `pd`.`prod_id` AND `od`.`status` = 1 AND `od`.`start_date` <= NOW() AND `od`.`end_date` >= NOW() " +
                "INNER JOIN `type_detail` AS `td` ON `pd`.`type_id` = `td`.`type_id` " +
                "INNER JOIN `image_detail` AS `imd` ON `imd`.`prod_id` = `pd`.`prod_id` AND `imd`.`status` = 1 " +
                "LEFT JOIN `review_detail` AS `rd` ON `rd`.`prod_id` = `pd`.`prod_id` " +
                " WHERE `pd`.`status` = ? GROUP BY `pd`.`prod_id` ORDER BY `pd`.`prod_id` DESC ", [
                "1"
            ], (err, result) => {

                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }

                res.json({
                    "status": "1", "payload": result
                });

            })
        }, "2")

    })

    app.post('/api/admin/product_category_type_brand_list', (req, res) => {
        helper.Dlog(req.body);
        checkAccessToken(req.headers, res, () => {

            db.query("SELECT `brand_id`, `brand_name` FROM `brand_detail` WHERE `status` = ? ;" +
                "SELECT `cat_id`, `cat_name`, (CASE WHEN `image` != '' THEN CONCAT('" + image_base_url + "', '', `image`) ELSE '' END ) AS `image`, `color` FROM `category_details` WHERE `status`= ? ;" +

                "SELECT `type_id`, `type_name`, (CASE WHEN `image` != '' THEN CONCAT('" + image_base_url + "', '', `image`) ELSE '' END ) AS `image`, `color` FROM `type_detail` WHERE `status` = ? ", ["1", "1", "1"], (err, result) => {

                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }

                    res.json({
                        'status': "1",
                        'payload': {
                            "brand_list": result[0],
                            "category_list": result[1],
                            "type_list": result[2],
                        }
                    })
                }

            )

        }, "2")
    })

    app.post('/api/admin/product_detail', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        checkAccessToken(req.headers, res, (uObj) => {
            helper.CheckParameterValid(res, reqObj, ["prod_id"], () => {

                getProductDetail(res, reqObj.prod_id);

            })
        }, "2")

    })

    function getProductDetail(res, prod_id) {
        db.query("SELECT `pd`.`prod_id`, `pd`.`cat_id`, `pd`.`brand_id`, `pd`.`type_id`, `pd`.`name`, `pd`.`detail`, `pd`.`unit_name`, `pd`.`unit_value`, `pd`.`nutrition_weight`, `pd`.`price`, `pd`.`created_date`, `pd`.`modify_date`, `cd`.`cat_name`, IFNULL( `bd`.`brand_name`, '' ) AS `brand_name` , `td`.`type_name` FROM `product_detail` AS  `pd` " +
            "INNER JOIN `category_details` AS `cd` ON `pd`.`cat_id` = `cd`.`cat_id` " +
            "LEFT JOIN `brand_detail` AS `bd` ON `pd`.`brand_id` = `bd`.`brand_id` " +
            "INNER JOIN `type_detail` AS `td` ON `pd`.`type_id` = `td`.`type_id` " +
            " WHERE `pd`.`status` = ? AND `pd`.`prod_id` = ? ; " +

            " SELECT `nutrition_id`, `prod_id`, `nutrition_name`, `nutrition_value` FROM `nutrition_detail` WHERE `prod_id` = ? AND `status` = ? ORDER BY `nutrition_name`;" +


            "SELECT `img_id`, `prod_id`, (CASE WHEN `image` != '' THEN CONCAT('" + image_base_url + "', '', `image`) ELSE '' END ) AS `image` FROM `image_detail` WHERE `prod_id` = ? AND `status` = ? ;" +
            
            "SELECT `rd`.`review_id`, `rd`.`prod_id`, `rd`.`user_id`, `rd`.`rate`, `rd`.`message`, `rd`.`created_date`, `ud`.`name` FROM `review_detail` AS `rd`  " +
            "INNER JOIN `user_details` AS `ud` ON `ud`.`user_id` = `rd`.`user_id` AND `rd`.`prod_id` = ? ORDER BY `rd`.`review_id` DESC ", ["1", prod_id, prod_id, "1", prod_id, "1", prod_id], (err, result) => {

            if (err) {
                helper.ThrowHtmlError(err, res);
                return;
            }

            if (result[0].length > 0) {

                result[0][0].nutrition_list = result[1];
                result[0][0].images = result[2];
                result[0][0].review_list = result[3];

                res.json({
                    "status": "1", "payload": result[0][0]
                });
            } else {
                res.json({ "status": "0", "message": "invalid item" })
            }



        })
    }

    app.post('/api/admin/zone_add', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["zone_name"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("SELECT `zone_id`, `name` FROM `zone_detail` WHERE `name`  = ? AND `status` = ?",[reqObj.zone_name, "1"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.length > 0) {
                        res.json({ "status": "1", "payload": result[0], "message": msg_already_added });
                    } else {
                        db.query("INSERT INTO `zone_detail`( `name`, `created_date`, `modify_date`) VALUES (?, NOW(), NOW())", [reqObj.zone_name], (err, result) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return;
                            }
                            if (result) {
                                res.json({ "status": "1", "payload": {
                                        "zone_id": result.insertId,
                                        "name": reqObj.zone_name,
                                    }, "message": msg_Zone_added});
                            } else {
                                res.json({ "status": "0", "message": msg_failure})
                            }
                        })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/zone_update', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["zone_id", "zone_name"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `zone_detail` SET `name`= ?, `modify_date` = NOW() WHERE `zone_id`= ? AND `status` = ? ", [
                    reqObj.zone_name, reqObj.zone_id, "1"
                ], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({"status": "1", "message": msg_Zone_Updated});
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/zone_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (uObj) => {
            db.query("SELECT `zone_id`, `name` FROM `zone_detail` WHERE `status`= ? ", ["1"], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }
                res.json({"status": "1", "payload": result});
            })
        }, "2")
    })

    app.post('/api/admin/zone_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["zone_id"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `zone_detail` SET `status`= ?, `modify_date` = NOW() WHERE `zone_id`= ? ", ["2", reqObj.zone_id], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({"status": "1", "message": msg_Zone_delete});
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }

                })
            }, "2")
        })
    })

    app.post('/api/admin/area_add', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["area_name", "zone_id"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("SELECT `area_id`, `name` FROM `area_detail` WHERE `name` = ? AND `zone_id` = ? AND `status` = ?", [reqObj.area_name, reqObj.zone_id, "1"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.length > 0) {
                        res.json({ "status": "1", "payload": result[0], "message": msg_already_added });
                    } 
                    else {
                        db.query("INSERT INTO `area_detail`( `name`, `zone_id` , `created_date`, `modify_date`) VALUES (?,?, NOW(), NOW())", [
                            reqObj.area_name, reqObj.zone_id
                        ], (err, result) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return;
                            }
                            if (result) {
                                res.json({"status": "1", "message": msg_Area_added});
                            } else {
                                res.json({ "status": "0", "message": msg_failure })
                            }
                        })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/area_update', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["area_id", "zone_id", "area_name"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `area_detail` SET `name`= ?, `zone_id` = ? , `modify_date` = NOW() WHERE `area_id`= ? AND `status` = ? ", [
                    reqObj.area_name, reqObj.zone_id, reqObj.area_id, "1"
                ], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({"status": "1", "message": msg_Area_Updated});
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/area_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["area_id"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `area_detail` SET `status`= ?, `modify_date` = NOW() WHERE `area_id`= ? ", [
                    "2", reqObj.area_id,
                ], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({"status": "1", "message": msg_Area_delete});
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/area_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        checkAccessToken(req.headers, res, (uObj) => {
            helper.CheckParameterValid(res, reqObj, ["zone_id"], () => {
                db.query("SELECT `ad`.`area_id`, `ad`.`zone_id` , `ad`.`name`, `zd`.`name` AS `zone_name`  FROM `area_detail` AS `ad` INNER JOIN `zone_detail` AS `zd` ON `zd`.`zone_id` = `ad`.`zone_id` AND `zd`.`status` = '1' AND `zd`.`zone_id` = ? WHERE `ad`.`status`= ? ", [
                    reqObj.zone_id, "1"
                ], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    res.json({"status": "1", "payload": result});
                })
            })
        }, "2")
    })

    app.post('/api/admin/offer_add', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["prod_id", "price", "start_date", "end_date"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("INSERT INTO `offer_detail`( `prod_id`, `price`, `start_date`, `end_date`, `created_date`, `modify_date`) VALUES (?,?,?, ?,NOW(), NOW())", [reqObj.prod_id, reqObj.price, reqObj.start_date, reqObj.end_date], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result) {
                        res.json({"status": "1", "message": msg_offer_added});
                    } else {
                        res.json({ "status": "0", "message": msg_failure })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/offer_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ["offer_id"], () => {
            checkAccessToken(req.headers, res, (uObj) => {
                db.query("UPDATE `offer_detail` SET `status`= ?, `modify_date` = NOW() WHERE `offer_id`= ? AND `status` = ? ", ["2", reqObj.offer_id, "1"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return;
                    }
                    if (result.affectedRows > 0) {
                        res.json({
                            "status": "1", "message": msg_offer_delete
                        });
                    } 
                    else {
                        res.json({ "status": "0", "message": msg_failure })
                    }
                })
            }, "2")
        })
    })

    app.post('/api/admin/offer_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;
        checkAccessToken(req.headers, res, (uObj) => {
            db.query("SELECT `offer_id`, `prod_id`, `price`, `start_date`, `end_date`, `status`, `created_date`, `modify_date` FROM `offer_detail` WHERE `status`= ? ", ["1"], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }
                res.json({"status": "1", "payload": result});
            })
        }, "2")
    })

    app.post('/api/admin/offer_product_list', (req, res) => {
        checkAccessToken(req.headers, res, (uObj) => {
            db.query('SELECT  `od`.`offer_id`, `od`.`prod_id`, `od`.`price` AS `offer_price`, `od`.`start_date`, `od`.`end_date`, `od`.`status`, `od`.`created_date`, `od`.`modify_date`, `pd`.`cat_id`, `pd`.`brand_id`, `pd`.`type_id`, `pd`.`name`, `pd`.`detail`, `pd`.`price`, `pd`.`unit_name`, `pd`.`unit_value`, `pd`.`nutrition_weight`, IFNULL( `cd`.`cat_name`, "" ) AS `cat_name`, IFNULL( `bd`.`brand_name`, "" ) AS `brand_name`, IFNULL( `td`.`type_name`, "" ) AS `type_name`, (CASE WHEN `imd`.`image` != "" THEN CONCAT( "' + image_base_url + '", "", `imd`.`image` ) ELSE "" END) AS `image` FROM `offer_detail` AS `od` ' +

            'INNER JOIN `product_detail` AS `pd` ON `od`.`prod_id` = `pd`.`prod_id` AND `pd`.`status` =  ?  ' +
            'LEFT JOIN `category_details` AS `cd` ON `pd`.`cat_id` = `cd`.`cat_id` AND `cd`.`status` = ? ' +
            'LEFT JOIN `brand_detail` AS `bd` ON `pd`.`brand_id` = `bd`.`brand_id` AND `bd`.`status` = ? ' +
            'LEFT JOIN `type_detail` AS `td` ON `pd`.`type_id` = `td`.`type_id` AND `td`.`status` = ? ' +
            'INNER JOIN `image_detail` AS `imd` ON `imd`.`prod_id` = `imd`.`prod_id` AND `imd`.`status` =  ?  ' +
            ' WHERE `od`.`status`= ? AND `od`.`end_date` >= NOW() GROUP BY `od`.`offer_id`', ["1", "1", "1", "1", "1","1"], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }
                res.json({"status": "1", "payload": result});
            })
        })
    })

    app.post('/api/admin/promo_code_add', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["code", "title", "description", "type", "min_order_amount", "max_discount_amount", "offer_price", "start_date", "end_date"], () => {
                db.query("SELECT `promo_code_id` FROM `promo_code_details` WHERE `code` = ? AND `status` = 1 ", [reqObj.code,], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res)
                        return
                    }
                    if (result.length > 0) {
                        res.json({
                            'status': '0',
                            'message': msg_already_added
                        })
                    } else {
                        db.query("INSERT INTO `promo_code_details` ( `code`, `title`, `description`, `type`, `min_order_amount`, `max_discount_amount`, `offer_price`, `start_date`, `end_date`) VALUES (?,?,?, ?,?,?, ?,?,?)", [
                            reqObj.code, reqObj.title, reqObj.description, reqObj.type, reqObj.min_order_amount, reqObj.max_discount_amount, reqObj.offer_price, reqObj.start_date, reqObj.end_date
                        ], (err, result) => {

                            if (err) {
                                helper.ThrowHtmlError(err, res)
                                return
                            }
                            if (result) {
                                res.json({
                                    'status': '1',
                                    'message': msg_promo_code_added
                                })
                            } else {
                                res.json({
                                    'status': '0',
                                    'message': msg_failure
                                })
                            }
                        })
                    }
                })
            })
        }, "2")
    })

    app.post('/api/admin/promo_code_update', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body
        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["promo_code_id", "title", "description", "type", "min_order_amount", "max_discount_amount", "offer_price", "start_date", "end_date"], () => {
                db.query("UPDATE `promo_code_details` SET `title`= ? ,`description`= ? ,`type`= ? ,`min_order_amount`= ? ,`max_discount_amount`= ? ,`offer_price`= ? ,`start_date`= ? ,`end_date`= ?, `modify_date` = NOW() WHERE `promo_code_id` = ? AND `start_date` >= NOW() AND `status` = 1 ", [
                    reqObj.title, reqObj.description, reqObj.type, reqObj.min_order_amount, reqObj.max_discount_amount, reqObj.offer_price, reqObj.start_date, reqObj.end_date, reqObj.promo_code_id
                ], (err, result) => {

                    if (err) {
                        helper.ThrowHtmlError(err, res)
                        return
                    }
                    if (result.affectedRows > 0) {
                        res.json({
                            'status': '1',
                            'message': msg_promo_code_update
                        })
                    } else {
                        res.json({
                            'status': '0',
                            'message': msg_failure
                        })
                    }
                })

            })
        }, "2")
    })

    app.post('/api/admin/promo_code_delete', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["promo_code_id"], () => {
                db.query("UPDATE `promo_code_details` SET `status`= 2 , `modify_date` = NOW() WHERE `promo_code_id` = ? AND `status` = 1 ", [reqObj.promo_code_id
                ], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res)
                        return
                    }
                    if (result.affectedRows > 0) {
                        res.json({
                            'status': '1',
                            'message': msg_promo_code_delete
                        })
                    } else {
                        res.json({
                            'status': '0',
                            'message': msg_failure
                        })
                    }
                })
            })
        }, "2")
    })

    app.post('/api/admin/promo_code_list', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            db.query("SELECT `promo_code_id`, `code`, `title`, `description`, `type`, `min_order_amount`, `max_discount_amount`, `offer_price`, `start_date`, `end_date`, `created_date`, `modify_date` FROM `promo_code_details` WHERE `status` = 1 ORDER BY `promo_code_id` DESC ", [], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res)
                    return
                }
                res.json({
                    'status': '1',
                    'payload': result,
                    'message': msg_success
                })
            })
        }, "2")
    })

    app.post('/api/admin/new_orders_list', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            db.query("SELECT `od`.`order_id`,`od`.`user_id`, `od`.`cart_id`, `od`.`total_price`, `od`.`user_pay_price`, `od`.`discount_price`, `od`.`deliver_price`, `od`.`deliver_type`, `od`.`payment_type`, `od`.`payment_status`, `od`.`order_status`, `od`.`status`, `od`.`created_date`, GROUP_CONCAT(DISTINCT `pd`.`name` SEPARATOR ',') AS `names`, GROUP_CONCAT(DISTINCT (CASE WHEN `imd`.`image` != '' THEN  CONCAT( '" + image_base_url + "' ,'', `imd`.`image` ) ELSE '' END) SEPARATOR ',') AS `images`, `ad`.`name` as `user_name`, `ad`.`phone`, `ad`.`address`, `ad`.`city`, `ad`.`state`, `ad`.`postal_code` FROM `order_detail` AS `od` " +
                "INNER JOIN `cart_detail` AS `cd` ON FIND_IN_SET(`cd`.`cart_id`, `od`.`cart_id`) > 0  " +
                "INNER JOIN `product_detail` AS `pd` ON  `cd`.`prod_id` = `pd`.`prod_id` " +
                "INNER JOIN `image_detail` AS `imd` ON  `imd`.`prod_id` = `pd`.`prod_id` " +
                "INNER JOIN `address_detail` AS `ad` ON  `od`.`address_id` = `ad`.`address_id` " +
                "WHERE (`od`.`payment_type` = 1 OR ( `od`.`payment_type` = 2 AND `od`.`payment_status` = 2 ) ) AND `order_status` <= 2 GROUP BY `od`.`order_id` ORDER BY `od`.`order_id` ", [], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res)
                        return
                    }

                    res.json({
                        "status": "1",
                        "payload": result,
                        "message": msg_success
                    })
                })
        }, '2')
    })

    app.post('/api/admin/completed_orders_list', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            db.query("SELECT `od`.`order_id`, `od`.`user_id`, `od`.`cart_id`, `od`.`total_price`, `od`.`user_pay_price`, `od`.`discount_price`, `od`.`deliver_price`, `od`.`deliver_type`, `od`.`payment_type`, `od`.`payment_status`, `od`.`order_status`, `od`.`status`, `od`.`created_date`, GROUP_CONCAT(DISTINCT `pd`.`name` SEPARATOR ',') AS `names`, GROUP_CONCAT(DISTINCT (CASE WHEN `imd`.`image` != '' THEN  CONCAT( '" + image_base_url + "' ,'', `imd`.`image` ) ELSE '' END) SEPARATOR ',') AS `images`, `ad`.`name` as `user_name`, `ad`.`phone`, `ad`.`address`, `ad`.`city`, `ad`.`state`, `ad`.`postal_code`  FROM `order_detail` AS `od` " +
                "INNER JOIN `cart_detail` AS `cd` ON FIND_IN_SET(`cd`.`cart_id`, `od`.`cart_id`) > 0  " +
                "INNER JOIN `product_detail` AS `pd` ON  `cd`.`prod_id` = `pd`.`prod_id` " +
                "INNER JOIN `image_detail` AS `imd` ON  `imd`.`prod_id` = `pd`.`prod_id` " +
                "INNER JOIN `address_detail` AS `ad` ON  `od`.`address_id` = `ad`.`address_id` " +
                "WHERE (`od`.`payment_type` = 1 OR ( `od`.`payment_type` = 2 AND `od`.`payment_status` = 2 ) ) AND `order_status` = 3 GROUP BY `od`.`order_id` ORDER BY `od`.`order_id` ", [], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res)
                        return
                    }

                    res.json({
                        "status": "1",
                        "payload": result,
                        "message": msg_success
                    })
                })
        }, '2')
    })

    app.post('/api/admin/cancel_decline_orders_list', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            db.query("SELECT `od`.`order_id`, `od`.`user_id`, `od`.`cart_id`, `od`.`total_price`, `od`.`user_pay_price`, `od`.`discount_price`, `od`.`deliver_price`, `od`.`deliver_type`, `od`.`payment_type`, `od`.`payment_status`, `od`.`order_status`, `od`.`status`, `od`.`created_date`, GROUP_CONCAT(DISTINCT `pd`.`name` SEPARATOR ',') AS `names`, GROUP_CONCAT(DISTINCT (CASE WHEN `imd`.`image` != '' THEN  CONCAT( '" + image_base_url + "' ,'', `imd`.`image` ) ELSE '' END) SEPARATOR ',') AS `images`, `ad`.`name` as `user_name`, `ad`.`phone`, `ad`.`address`, `ad`.`city`, `ad`.`state`, `ad`.`postal_code`  FROM `order_detail` AS `od` " +
                "INNER JOIN `cart_detail` AS `cd` ON FIND_IN_SET(`cd`.`cart_id`, `od`.`cart_id`) > 0  " +
                "INNER JOIN `product_detail` AS `pd` ON  `cd`.`prod_id` = `pd`.`prod_id` " +
                "INNER JOIN `image_detail` AS `imd` ON  `imd`.`prod_id` = `pd`.`prod_id` " +
                "INNER JOIN `address_detail` AS `ad` ON  `od`.`address_id` = `ad`.`address_id` " +
                "WHERE (`od`.`payment_type` = 1 OR ( `od`.`payment_type` = 2 AND `od`.`payment_status` = 2 ) ) AND `order_status` > 3  GROUP BY `od`.`order_id` ORDER BY `od`.`order_id` ", [], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res)
                        return
                    }

                    res.json({
                        "status": "1",
                        "payload": result,
                        "message": msg_success
                    })
                })
        }, '2')
    })

    app.post('/api/admin/order_detail', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["order_id", "user_id"], () => {


                db.query("SELECT `od`.`order_id`, `od`.`cart_id`, `od`.`total_price`, `od`.`user_pay_price`, `od`.`discount_price`, `od`.`deliver_price`, `od`.`deliver_type`, `od`.`payment_type`, `od`.`payment_status`, `od`.`order_status`, `od`.`status`, `od`.`created_date` FROM `order_detail` AS `od` " +

                    "WHERE `od`.`order_id` = ? AND `od`.`user_id` = ? ;" +

                    "SELECT `uod`.`order_id`, `ucd`.`cart_id`, `ucd`.`user_id`, `ucd`.`prod_id`, `ucd`.`qty`, `pd`.`cat_id`, `pd`.`brand_id`, `pd`.`type_id`, `pd`.`name`, `pd`.`detail`, `pd`.`unit_name`, `pd`.`unit_value`, `pd`.`nutrition_weight`, `pd`.`price`, `pd`.`created_date`, `pd`.`modify_date`, `cd`.`cat_name`, IFNULL( `bd`.`brand_name`, '' ) AS `brand_name` , `td`.`type_name`, IFNULL(`od`.`price`, `pd`.`price` ) as `offer_price`, IFNULL(`od`.`start_date`,'') as `start_date`, IFNULL(`od`.`end_date`,'') as `end_date`, (CASE WHEN `od`.`offer_id` IS NOT NULL THEN 1 ELSE 0 END) AS `is_offer_active`, (CASE WHEN `imd`.`image` != '' THEN  CONCAT( '" + image_base_url + "' ,'', `imd`.`image` ) ELSE '' END) AS `image`, (CASE WHEN `od`.`price` IS NULL THEN `pd`.`price` ELSE `od`.`price` END) as `item_price`, ( (CASE WHEN `od`.`price` IS NULL THEN `pd`.`price` ELSE `od`.`price` END) * `ucd`.`qty`)  AS `total_price`, IFNULL( `rd`.`rate`, 0) AS `rating`, IFNULL( `rd`.`message`, '') AS `review_message` FROM `order_detail` AS `uod` " +
                    "INNER JOIN `cart_detail` AS `ucd` ON FIND_IN_SET(`ucd`.`cart_id`, `uod`.`cart_id`) > 0  " +
                    "INNER JOIN `product_detail` AS `pd` ON `pd`.`prod_id` = `ucd`.`prod_id` " +
                    "INNER JOIN `category_details` AS `cd` ON `pd`.`cat_id` = `cd`.`cat_id` " +

                    "LEFT JOIN `brand_detail` AS `bd` ON `pd`.`brand_id` = `bd`.`brand_id` " +
                    "LEFT JOIN `offer_detail` AS `od` ON `pd`.`prod_id` = `od`.`prod_id` AND `od`.`status` = 1 AND `od`.`start_date` <= NOW() AND `od`.`end_date` >= NOW() " +
                    "LEFT JOIN `review_detail` AS `rd` ON `uod`.`order_id` = `rd`.`order_id` " +
                    "INNER JOIN `image_detail` AS `imd` ON `pd`.`prod_id` = `imd`.`prod_id` AND `imd`.`status` = 1 " +
                    "INNER JOIN `type_detail` AS `td` ON `pd`.`type_id` = `td`.`type_id` " +
                    "WHERE `uod`.`order_id` = ? AND `uod`.`user_id` = ? GROUP BY `ucd`.`cart_id`, `pd`.`prod_id`", [reqObj.order_id, reqObj.user_id, reqObj.order_id, reqObj.user_id], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res)
                            return
                        }

                        if (result[0].length > 0) {

                            result[0][0].cart_list = result[1]

                            res.json({
                                "status": "1",
                                "payload": result[0][0],
                                "message": msg_success
                            })
                        } else {
                            res.json({
                                'status': '0',
                                'message': 'invalid order'
                            })
                        }
                    })
            })
        }, '2')
    })

    app.post('/api/admin/order_status_change', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["order_id", "user_id", "order_status"], () => {
                db.query("UPDATE `order_detail` SET `order_status`= ?,`modify_date`= NOW() WHERE `order_id` = ? AND `user_id` = ? AND `order_status` < ? ", [reqObj.order_status, reqObj.order_id, reqObj.user_id, reqObj.order_status], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }

                    if (result.affectedRows > 0) {

                        var title = ""
                        var message = ""
                        var notiType = 2
                        //1: new, 2: order_accept, 3: order_delivered, 4: cancel, 5: order declined	
                        switch (reqObj.order_status) {
                            case "2":
                                title = "Order Accepted"
                                message = "your order #" + reqObj.order_id + " accepted."
                                break;
                            case "3":
                                title = "Order Delivered"
                                message = "your order #" + reqObj.order_id + " delivered."
                                break;
                            case "4":
                                title = "Order Cancel"
                                message = "your order #" + reqObj.order_id + " canceled."
                                break;
                            case "5":
                                title = "Order Declined"
                                message = "your order #" + reqObj.order_id + " declined."
                                break;
                            default:
                                break;
                        }

                        db.query("INSERT INTO `notification_detail`( `ref_id`, `user_id`, `title`, `message`, `notification_type`) VALUES (?,?,?, ?,?)", [reqObj.order_id, reqObj.user_id, title, message, notiType], (err, iResult) => {
                            if (err) {
                                helper.ThrowHtmlError(err);
                                return
                            }

                            if (iResult) {
                                helper.Dlog("Notification Added Done")
                            } else {
                                helper.Dlog("Notification Fail")
                            }
                        })

                        res.json({
                            "status": "1",
                            "message": "Order Status updated successfully"
                        })
                    } else {
                        res.json({
                            "status": "0",
                            "message": msg_failure
                        })
                    }
                })
            })
        }, '2')
    })

}

function saveImage(imageFile,savePath){
    fs.rename(imageFile.path,savePath,(err)=>{
        if(err){
            helper.ThrowHtmlError(err);
            return;
        }
    })
}

function checkAccessToken(headerObj,res,callback,require_type=""){
    helper.Dlog(headerObj.access_token);
    helper.CheckParameterValid(res,headerObj,["access_token"],()=>{
        db.query("SELECT `user_id`, `username`, `user_type`, `name`, `email`, `mobile`, `mobile_code`, `auth_token`, `device_token`, `status` FROM `user_details` WHERE `auth_token` = ? AND `status` = ? ",[headerObj.access_token,"1"],(err,result)=>{
            if(err){
                helper.ThrowHtmlError(err,res)
                return
            }
            helper.Dlog(result);
            if(result.length > 0){
                if(require_type != ""){
                    if(require_type == result[0].user_type){
                        return callback(result[0])
                    }else{
                        res.json({"status":"0","code":"404","message":"Access Denied. Unauthorised User Access"})
                    }
                }
                else{
                    return callback(result[0]);
                }
            }
            else{
                res.json({"status":"0","code":"404","message":"Access Denied. Unauthorised User Access"})
            }
        })
    })
}