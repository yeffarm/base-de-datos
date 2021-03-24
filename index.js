
const {ipcRenderer} = require('electron')

var con = document.getElementById("contenido")
var bot = document.getElementById("boton")
var nom = document.getElementById("nombres")
var fecha = new Date()
var d = "consulta realizada"


bot.addEventListener("click",realizarPeticion)
var te =  document.getElementById("texto")


function realizarPeticion(){
    fetch(` https://pokeapi.co/api/v2/pokemon/${te.value}` )
        .then(res =>{
            res.json()
               .then(resJSON =>{
                 con.innerHTML = `
                 <h1>${resJSON.order}</h1>
                 <img src = "${resJSON.sprites.front_default}"/>
                 ` 
                 nom.innerHTML = `
                 <h1>${resJSON.name}</h1>`
                })
               .catch(err=>alert(err))
        })
}

document.getElementById("boton2").addEventListener("click",
        function(){
            ipcRenderer.send("registro",[fecha])
        })

document.getElementById("boton3").addEventListener("click",
         function(){
            ipcRenderer.send('consulta',[d])
            document.getElementById('boton2').disabled=true;
           
         })
         ipcRenderer.on("respuesta",function(event,args){
             console.log(args)
         })

