const fs = require('fs');
const { rawListeners } = require('process');
cont = 0;

let listadoPorHacer = [];

const guardarDB = function() {
    let data = JSON.stringify(listadoPorHacer);


    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    });



}

const cargardb = function() {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
        console.log('Arreglo vacio');
    }


    return listadoPorHacer;

}

const getListado = function() {

    cargardb();

    return listadoPorHacer;

}


const crear = function(descripcion) {

    cargardb();

    let porHacer = {
        descripcion: descripcion,
        completado: false,


    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    //return cargardb();
    return porHacer;

}


const actualizar = (descripcion, completado = true) => {
    cargardb(); //cargar la lista para despues recorrerla



    /*  let iindex = listadoPorHacer.findIndex(tarea => {

        return tarea.descripcion === descripcion;



    })

    if (iindex >= 0) {
        listadoPorHacer[iindex].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
 */

    let pos = 0;
    for (let eleme of listadoPorHacer) {


        if (eleme.descripcion == descripcion) {


            listadoPorHacer[pos].completado = eleme.completado;



            guardarDB();



        }
        pos++;
    }
    return true;









}

const borrar = (descripcion) => {

    cargardb();
    let i = 0;
    let viejoListado = listadoPorHacer.length
    let nuevoListado = listadoPorHacer.length;

    listadoPorHacer.forEach(element => {



        if (element.descripcion == descripcion) {
            delete listadoPorHacer[i];
            guardarDB();
            nuevoListado--;

        }
        i++;

    });


    if (nuevoListado == viejoListado) {
        return 'no se borro';

    } else {
        return 'se borro';

    }




    /*  cargardb();
     let nuevoListado = listadoPorHacer.filter(tarea => {
         return tarea.descripcion != descripcion
     });

     if (listadoPorHacer.length === nuevoListado.length) {
         return false;
     } else {
         listadoPorHacer = nuevoListado;
         guardarDB();
         return true;
     } */

}




module.exports = {

    crear,
    getListado,
    actualizar,
    borrar
}