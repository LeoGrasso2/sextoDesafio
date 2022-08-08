let listaNotas=[];
let seguir;
let numNota=0;
let i=0;
let lat;
let lon;
let idiomaUser = navigator.language.slice(0,2);

totalNotas = JSON.parse(localStorage.getItem('listaNotas'));

totalNotas.forEach(cargarNotas);

document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(function() {
      document.body.className = '';
    }, 230);
}
)

function cargarNotas(){
    listaNotas.push({
        notaTitle: totalNotas[i].notaTitle,
        notaTexto: totalNotas[i].notaTexto,
        numNota: i,
    })
    localStorage.getItem(`listaNotas[${i}]`);
    contenedor = document.createElement('div');
    contenedor.setAttribute("class", `nota`);
    contenedor.setAttribute("id", `nota${listaNotas[i].numNota}`);
    contenedor.setAttribute("style", "box-shadow: 2px 5px 5px rgba(117, 117, 117, 0.37);  height:fit-content;border-radius: 10px; margin-right: 10px; max-width: 250px; max-height: fit-content; display: flex; min-width: 150px; margin-bottom:10px; background-color: rgb(238, 255, 0); flex-direction: column; overflow-wrap: break-word;");
    
    contenedor.innerHTML= `<div class="notaTop"><div class="tituloNota"><b>${listaNotas[i].notaTitle}</b></div><button class="botonDelete" id="botonDelete(${listaNotas[i].numNota})" onclick="deleteNota(${listaNotas[i].numNota})">X</button></div><div class="contenidoNota"><div class="notaTexto">${listaNotas[i].notaTexto}</div><button class="botonEdit" onclick="editarNotaTemp(${listaNotas[i].numNota})">Editar</button>`;
    
    document.getElementById("notasTotales").appendChild(contenedor);

    let divActual = document.getElementById(`nota${listaNotas[i].numNota}`);  
    const botonBorrar = document.getElementById(`botonDelete(${listaNotas[i].numNota})`);

    botonBorrar.addEventListener('mouseover', () => {
        divActual.classList.add('vibrate-1');
    })

    botonBorrar.addEventListener('mouseout', () => {
        divActual.classList.remove('vibrate-1');
    }
    )
    i++;
}

function addNotaTemp(){
    if(!document.getElementById(`notaTemp${i}`)){
    contenedor = document.createElement('div');
    contenedor.setAttribute("style", "box-shadow: 2px 5px 5px rgba(117, 117, 117, 0.37);  height:fit-content; font-family: sans-serif; border-radius: 10px; margin-right: 10px; max-height: fit-content; display: flex; min-width: 150px; background-color: rgb(238, 255, 0); flex-direction: column; overflow-wrap: break-word;");
    contenedor.setAttribute(`id`,`notaTemp${i}`)
    contenedor.innerHTML= `<div class="notaTop"><div class="tituloNota"><u><textarea placeholder="Ingrese un titulo" class="inputTitle" name="inputTitle" id="inputTitle"></textarea></u></div></div><br><div class="contenidoNota" style="align-items:center"><textarea placeholder="Ingrese su nota" class="inputTexto" id="inputTexto"></textarea><div class="botones"><input type="submit" class="inputEnviar" id="agregar${i}" onclick="addNota(${i})" value="Enviar"><button onclick="cancelarNota(${i})" class="cancelBtn" id="cancelBtn">X</button></div></div>`;
    document.getElementById("notasTotales").appendChild(contenedor);
    const botonAdd=document.querySelector(`#agregar${i}`);
    botonAdd.addEventListener('click', () => {
        Toastify({
            text: "Nota agregada con exito.",

            duration: 2500,

            close: true,

            style: {
                background: "rgb(36, 36, 36)",
                fontFamily: "sans-serif",
                color: "white",
                borderRadius: "10px",
                paddingRight: "10px",
            }
        }).showToast();
    })

    const textarea = document.querySelector("#inputTexto");
    textarea.addEventListener('input', redimensionar, false);    
}
}

function addNota(valorTemp){

    let notaTitle=document.getElementById('inputTitle').value;
    let notaTexto=document.getElementById('inputTexto').value;

    this.i=i; 

    listaNotas.push({
        notaTitle: notaTitle,
        notaTexto: notaTexto,
        numNota: i,
    })
    let borrarNota = document.getElementById(`notaTemp${valorTemp}`);
    borrarNota.remove();
    
    contenedor = document.createElement('div');
    contenedor.setAttribute("class", `nota`);
    contenedor.setAttribute("id", `nota${listaNotas[i].numNota}`);
    contenedor.setAttribute("style", "box-shadow: 2px 5px 5px rgba(117, 117, 117, 0.37);  height:fit-content;border-radius: 10px; margin-right: 10px; max-width: 250px; max-height: fit-content; display: flex; min-width: 150px; margin-bottom:10px; background-color: rgb(238, 255, 0); flex-direction: column; overflow-wrap: break-word;");
    
    contenedor.innerHTML= `<div class="notaTop"><div class="tituloNota"><b>${notaTitle}</b></div><button class="botonDelete" id="botonDelete(${listaNotas[i].numNota})" onclick="deleteNota(${listaNotas[i].numNota})">X</button></div><div class="contenidoNota"><div class="notaTexto">${notaTexto}</div><button class="botonEdit" onclick="editarNotaTemp(${listaNotas[i].numNota})">Editar</button>`;
    
    
    document.getElementById("notasTotales").appendChild(contenedor);
    let divActual = document.getElementById(`nota${listaNotas[i].numNota}`);
    const botonBorrar = document.getElementById(`botonDelete(${listaNotas[i].numNota})`);
    
    if(botonBorrar){
    botonBorrar.addEventListener('mouseover', () => {
        divActual.classList.add('vibrate-1');
    })

    botonBorrar.addEventListener('mouseout', () => {
        divActual.classList.remove('vibrate-1');
    }
    )
}
    
    localStorage.setItem("listaNotas", JSON.stringify(listaNotas));
    
    i++;

    botonBorrar.addEventListener('click', () => {
    Toastify({
        text: "Nota eliminada con exito.",

        duration: 2500,

        close: true,

        style: {
            background: "rgb(36, 36, 36)",
            fontFamily: "sans-serif",
            color: "white",
            borderRadius: "10px",
            paddingRight: "10px",
        }
    }).showToast();
})
}

function deleteNota(del){
    let borrarNota = document.getElementById(`nota${del}`);
    borrarNota.classList.remove('vibrate-1');
    borrarNota.classList.add('animate__animated', 'animate__rollOut');
    borrarNota.addEventListener('animationend', () => {
    borrarNota.remove();
})
    listaNotas.splice(del, 1);
    totalNotas.splice(del, 1);
    localStorage.setItem("listaNotas", JSON.stringify(listaNotas));

    for(let i=0; i<listaNotas.length; i++){
        if(i>del){
            listaNotas[i].numNota=listaNotas[i].numNota-1;
    }
}
    
    i=(listaNotas.length)-1;
    if(i<0){
        i=0;
    }


}

function editarNotaTemp(del){
    
    this.i=i;
    
    let notaPrevia = document.getElementById(`nota${del}`);

    notaPrevia.setAttribute("style", "box-shadow: 2px 5px 5px rgba(117, 117, 117, 0.37);  height:fit-content; font-family: sans-serif; border-radius: 10px; margin-right: 10px; max-height: fit-content; display: flex; min-width: 150px; background-color: rgb(238, 255, 0); flex-direction: column; overflow-wrap: break-word;");
    notaPrevia.setAttribute(`id`,`notaTemp${del}`);
    notaPrevia.innerHTML= `<div class="notaTop"><div class="tituloNota"><u><textarea class="inputTitle" name="inputTitle" id="inputTitle">${listaNotas[del].notaTitle}</textarea></u></div></div><br><div class="contenidoNota" style="align-items:center"><textarea class="inputTexto" id="inputTexto">${listaNotas[del].notaTexto}</textarea><div class="botones"><input type="submit" id="input${del}" class="inputEnviar" onclick="editarNota(${del})" value="Enviar"></div></div>`;
    document.getElementById("notasTotales").appendChild(contenedor);
    notaPrevia = document.getElementById("notasTotales");
    let botonSubmit = document.querySelector(`#input${del}`);
    botonSubmit.addEventListener('click', () => {
            Toastify({
                text: "Nota editada con exito.",

                duration: 2500,

                close: true,

                style: {
                    background: "rgb(36, 36, 36)",
                    fontFamily: "sans-serif",
                    color: "white",
                    borderRadius: "10px",
                    paddingRight: "10px",
                }
            }).showToast();
        })

    const textarea = document.querySelector("#inputTexto");
    textarea.addEventListener('input', redimensionar, false);
    
}

function editarNota(del){   

    let notaTitle=document.getElementById('inputTitle').value;
    let notaTexto=document.getElementById('inputTexto').value;

    let editNota = document.getElementById(`notaTemp${del}`);

    listaNotas.splice(del, 1,{
        notaTitle: notaTitle,
        notaTexto: notaTexto,
        numNota: del,
    })

    totalNotas.splice(del, 1,{
        notaTitle: notaTitle,
        notaTexto: notaTexto,
        numNota: del,
    })
    
    localStorage.setItem("listaNotas", JSON.stringify(listaNotas));

    editNota.setAttribute("class", `nota`);
    editNota.setAttribute("id", `nota${listaNotas[del].numNota}`);
    editNota.setAttribute("style", "box-shadow: 2px 5px 5px rgba(117, 117, 117, 0.37);  height:fit-content;border-radius: 10px; margin-right: 10px; max-width: 250px; max-height: fit-content; display: flex; min-width: 150px; margin-bottom:10px; background-color: rgb(238, 255, 0); flex-direction: column; overflow-wrap: break-word;");
    
    editNota.innerHTML= `<div class="notaTop"><div class="tituloNota"><b>${notaTitle}</b></div><button class="botonDelete" id="botonDelete(${listaNotas[del].numNota})" onclick="deleteNota(${listaNotas[del].numNota})">X</button></div><div class="contenidoNota"><div class="notaTexto">${notaTexto}</div><button class="botonEdit" onclick="editarNotaTemp(${listaNotas[del].numNota})">Editar</button>`;

    
    let divActual = document.getElementById(`nota${listaNotas[del].numNota}`);
    const botonBorrar = document.getElementById(`botonDelete(${listaNotas[del].numNota})`);

    botonBorrar.addEventListener('mouseover', () => {
        divActual.classList.add('vibrate-1');
    })

    botonBorrar.addEventListener('mouseout', () => {
        divActual.classList.remove('vibrate-1');
    }
    )

    botonBorrar.addEventListener('click', () => {
        Toastify({
            text: "Nota eliminada con exito.",
    
            duration: 2500,
    
            close: true,
    
            style: {
                background: "rgb(36, 36, 36)",
                fontFamily: "sans-serif",
                color: "white",
                borderRadius: "10px",
                paddingRight: "10px",
            }
        }).showToast();
    })
}

function localizacionUser(){
    window.navigator.geolocation.getCurrentPosition(getClima);
}



function getClima(pos){
    lat=pos.coords.latitude;
    lon=pos.coords.longitude;
    const api = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a5a1affdc302ee786095b698440ea8d1&lang=${idiomaUser}&units=metric`)
    .then((resp) => resp.json())
    .then ((clima) => {
        console.log(clima);
        dibujarClima(clima);
    });
}

function dibujarClima(clima){
    codigoIcon=clima.weather[0].icon;
    contenedorClima = document.createElement('div');
    contenedorClima.setAttribute('id', 'clima');
    contenedorClima.innerHTML = `<div class="climaTotal"><img id="climaIcon" src="http://openweathermap.org/img/w/${clima.weather[0].icon}.png">La temperatura actual en ${clima.name} es de ${clima.main.temp}°C</div>`;
    document.getElementById("headPage").appendChild(contenedorClima);
}

localizacionUser();

// 1. i think it's not okay at all, because everyone has their own privacy and journalist 
// accessing people's intimacy would be interfering with personal privacy. unless the person 
// explicitly wants to provide that information, journalist should never be able to access it

function cancelarNota(valorTemp){
    let borrarNota = document.getElementById(`notaTemp${valorTemp}`);
    borrarNota.remove();

}

function redimensionar(){
    this.style.height= 'auto';
    this.style.height = this.scrollHeight + 'px';

}
