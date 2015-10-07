(function(){
    'use strict';
    
    angular
        .module("optikApp")
        .factory("dataFactory", dataFactory);
        
    dataFactory.$inject = ['$http','$meteor'];
    
    function dataFactory($http, $firebaseArray){
        var clientesRef = new $Mongo.collection('clientes');
        var service = {
            clientesArray : $firebaseArray(clientesRef),
            parseXLSX : parseXLSX,
            lineas: getXlsxLines
        };
        return service;
    }  

    /* IMPLEMENTACIONES */
    
    // Prepara el archivo y muestra info general de los datos contenidos
    // Nos vendrían bien total de lineas 
    function getXlsxLines(file){
        var archivo = file || null;
        console.log(archivo);
        //return archivo? Object.keys(archivo).length: 0; 
        if (archivo) {
            var reader = new FileReader();
            reader.onload = function(e){
                var data = e.target.result;
                var libro = XLSX.read(data, {type: "binary"});
                var nombre_hoja = libro.SheetNames[0];
                var hoja = libro.Sheets[nombre_hoja];
                var lineas = XLSX.utils.sheet_to_json(hoja);
                console.log(lineas);
                return lineas;
            }
            reader.readAsBinaryString(archivo);
        }else{
            return {};
        }
    }
    
    function parseXLSX(file){
        var reader = new FileReader();
        reader.onload = function(e){
            var data = e.target.result;
            var libro = XLSX.read(data, {type: "binary"});
            var nombre_hoja = libro.SheetNames[0];
            var hoja = libro.Sheets[nombre_hoja];
            var lineas  = XLSX.utils.sheet_to_json(hoja);
            console.log(lineas);
            
            lineas.forEach(function(linea){
                var codigo = linea.Cod,
                    marca = linea.Marca;
                    
                var doc = {
                    nombre: linea.Nombre || "",
                    localidad: fixCiudad(linea.Localidad) || "",
                    provincia: linea.Provincia,
                    cluster: linea.CLUSTER,
                    cp: linea.CP || "",
                    grupo: linea["Nombre grupo"] || ""
                };
                doc[marca] = {
                    piezas_ult_pedido: linea["Pzas último pedido"] || "",
                    fecha_ult_pedido: linea["Fecha ult pedido"] || "",
                    total_anterior: linea["Pzas Fact Total YAG"] || "",
                    piezas_hasta_ahora: linea["Pzas Order YTD.AA"] || ""
                }
                //if (doc.localidad) {
                if (false) { //desactiva clima, la api no parece tirar bien
                //mirar el plnkr con api de yahoo
                    $http.get("https://pro.openweathermap.org/data/2.5/weather?q=" + doc.localidad + ",es&lang=es&APPID=f0257111477625494cc7833f3e3caa51")
                        .success(function(data) {
                            doc.loc = {
                                lat: data.coord.lat,
                                lon: data.coord.lon
                            }
                            doc.weather = {
                                descripcion: data.weather[0].description,
                                icon: data.weather[0].icon
                            }
                            clientesRef.child(codigo).update(doc);
                        });
                    }
                clientesRef.child(codigo).set(doc);
                console.log(doc);
            // FIN foreach
            });
        // FIN reader.onLoad
        }
        reader.readAsBinaryString(file);
    }
    
function fixCiudad(city){
    var i = city.indexOf('(');
    if (i >0){
        return city.substr(0,i-1);
    }else{
        return city;
    }
}
})();
    

    

    
    
