var mysql = require('mysql')
var config = require('config')
var dbconfig = config.get('dbConfig')
var db = mysql.createConnection(dbconfig)
var helper = require('./helpers')
const { query } = require('express')
 
if(config.has('optionalFeature.detail')){
    var detail = config.get('optionalFeature.detail');
    helper.Dlog('config: '+detail);
}

reconnect(db,()=>{});

function reconnect(connection,callback){
    helper.Dlog("\n New connection tenative ...(" + helper.server_YYYYMMDD_HHmmss()+")")
    connection = mysql.createConnection(dbconfig)
    connection.connect((err) => {
        if(err){
            helper.ThrowHtmlError(err);

            setTimeout(()=>{
                helper.Dlog('-----------DB Reconnecting Error(' + helper.server_YYYYMMDD_HHmmss() + '-----------------');

                reconnect(connection,callback);
            },5*1000);
        }else{
            helper.Dlog('\n\t ------new connection established with database-------');
            db = connection;
            return callback()
        }
    });

    connection.on('error',(err) => {
        helper.Dlog('\n\t -------App is connection crash DB helper('+helper.server_YYYYMMDD_HHmmss()+')-------');

        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            helper.Dlog("/!\\ PROTOCOL_CONNECTION_LOST cannot establish a connection with the database. /!\\("+err.code+")");
            reconnect(db,callback)
        }else if(err.code === "PROTOCOL_ENQUE_AFTER_QUIT"){
            helper.Dlog("/!\\ PROTOCOL_ENQUE_AFTER_QUIT cannot establish a connection with the database. /!\\("+err.code+")");
            reconnect(db,callback)
        }
        else if(err.code === "PROTOCOL_ENQUE_AFTER_FATAL_ERROR"){
            helper.Dlog("/!\\ PROTOCOL_ENQUE_AFTER_FATAL_ERROR cannot establish a connection with the database. /!\\("+err.code+")");
            reconnect(db,callback)
        }
        else if(err.code === "PROTOCOL_ENQUE_HANDSHAKE_TWICE"){
            helper.Dlog("/!\\ PROTOCOL_ENQUE_HANDSHAKE_TWICE cannot establish a connection with the database. /!\\("+err.code+")");
            reconnect(db,callback)
        }
        else if(err.code === "ECONNREFUSED"){
            helper.Dlog("/!\\ ECONNREFUSED cannot establish a connection with the database. /!\\("+err.code+")");
            reconnect(db,callback)
        }
        else if(err.code === "PROTOCOL_PACKETS_OUT_OF_ORDER"){
            helper.Dlog("/!\\ PROTOCOL_PACKETS_OUT_OF_ORDER cannot establish a connection with the database. /!\\("+err.code+")");
            reconnect(db,callback)
        }else{
            throw err;
        }
    })
}

module.exports = {
    query : (sqlQuery , args , callback) => {
        if(db.state === 'authenticated' || db.state === "connected"){
            db.query(sqlQuery,args,(error,result)=>{
                return callback(error,result);
            })
        }else if(db.state === "protocol_error"){
            reconnect(db,()=>{
                db.query(sqlQuery,args,(error,result)=>{
                    return callback(error,result);
                })
            })
        }
        else{
            reconnect(db,()=>{
                db.query(sqlQuery,args,(error,result)=>{
                    return callback(error,result);
                })
            })
        }
    }
}

process.on('uncaughtException',(err) =>{
    helper.Dlog('--------App is crash DB Helper('+helper.server_YYYYMMDD_HHmmss()+')')
    helper.Dlog(err.code);
    helper.ThrowHtmlError(err);
})

