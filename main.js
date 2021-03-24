const {ipcMain} = require('electron')

const{app, BrowserWindow } = require("electron")


const mysql = require("mysql2")

function ventanaPrincipal(){
    const ventana = new BrowserWindow({
        width: 400,
        heigth: 310,
        webPreferences: ({
            nodeIntegration: true
        })

    })
    ventana.loadFile("./index.html")
}

app.whenReady().then(ventanaPrincipal)

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "pokemon"
})

ipcMain.on("registro", function(event,args){
    connection.query('INSERT INTO tipos VALUES(0,0,?)',
    args)

})

ipcMain.on("consulta", function(event,args){
    connection.query('SELECT * FROM tipos',
    function(err,results,fields){
    event.reply("respuesta",results)
    }
)})

