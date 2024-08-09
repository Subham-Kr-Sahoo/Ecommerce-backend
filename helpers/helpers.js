var momemt = require('moment-timezone');
var fs = require('fs');
const { dlopen } = require('process');
const { format } = require('path');

const app_debug_mode = true;
const timezone_name = "Asia/Kolkata";
const msg_server_internal_error = "Server Internal Error"

module.exports = {
    ImagePath:() => {
        return "http://localhost:3001/img/";
    },

    ThrowHtmlError: (err,res) => {
        Dlog("--------------------------- App is Helpers Throw Crash("+ server_YYYYMMDD_HHmmss() +")-------------------------------------")
        Dlog(err.stack);

        fs.appendFile('./crash_log/Crash' + serverDateTime('YYYY-MM-DD HH:mm:ss ms')+'.txt' , err.stack ,(err)=>{
            if(err){
                Dlog(err);
            }
        })

        if(res){
            res.json({'status':'0',"message":msg_server_internal_error})
            return
        }
    },
    ThrowSocketError: (err,client,event_name) => {
        Dlog("--------------------------- App is Helpers Throw Crash("+ server_YYYYMMDD_HHmmss() +")-------------------------------------")
        Dlog(err.stack);

        fs.appendFile('./crash_log/Crash' + serverDateTime('YYYY-MM-DD HH:mm:ss ms')+'.txt' , err.stack ,(err)=>{
            if(err){
                Dlog(err);
            }
        })

        if(client){
            client.emit(event_name,{'status':'0',"message":msg_server_internal_error})
            return
        }
    },

    CheckParameterValid : (res, jsonObj, checkKeys, callback) => {
        var isValid = true
        var missingParameter = "";
        checkKeys.forEach((key,indexOf)=>{
            if(!Object.prototype.hasOwnProperty.call(jsonObj,key)){
                isValid = false;
                missingParameter += key+" ";

            }
        });
        if(!isValid){
            if(!app_debug_mode){
                missingParameter = "";
            }
            res.json({'status':'0',"message":"Missing Parameter(" + missingParameter + ")"})
        }else{
            return callback()
        }
    },

    CheckParameterValidSocket : (client, eventName, jsonObj, checkKeys, callback) => {
        var isValid = true
        var missingParameter = "";
        checkKeys.forEach((key,indexOf)=>{
            if(!Object.prototype.hasOwnProperty.call(jsonObj,key)){
                isValid = false;
                missingParameter += key+" ";
            }
        });
        if(!isValid){
            if(!app_debug_mode){
                missingParameter = "";
            }
            client.emit(event_name,{'status':'0',"message":"Missing Parameter(" + missingParameter + ")"})
            
        }else{
            return callback()
        }
    },

    createRequestToken: () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var result = ''
        for (let i = 20; i>0; i--) {
            result += chars[Math.floor(Math.random() * chars.length)]; 
        }
        return result;
    },

    fileNameGenerate: (extension) => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var result = ''
        for (let i = 20; i>0; i--) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return serverDateTime('YYYYMMDDHHmmssms') + result + '.' +extension;
    },

    Dlog: (log) => {
        return Dlog(log)
    },

    serverDateTime: (format) => {
        return serverDateTime(format);
    },

    server_YYYYMMDD_HHmmss: () => {
        return server_YYYYMMDD_HHmmss();
    },

    createNumber:(length = 4) => {
        var chars = "0123456789"
        var result = '';
        for (let i = length; i > 0; i--) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }
}

function serverDateTime(format){
    var jun = momemt(new Date());
    jun.tz(timezone_name).format();
    return jun.format(format);
}

function Dlog(log){
    if(app_debug_mode){
        console.log(log);
    }
}

function server_YYYYMMDD_HHmmss(){
    return serverDateTime('YYYY-MM-DD HH:mm:ss');
}

process.on('uncaughtException',(err) => {

})