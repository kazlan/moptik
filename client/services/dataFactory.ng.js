/* global Clientes */
/* global XLSX */
    angular
        .module("optikApp")
        .factory("dataFactory", dataFactory);
        
    dataFactory.$inject = ['$meteor','locationFactory'];
    
    function dataFactory($meteor,locationFactory){
        var service = {
            clientesArray : $meteor.collection(Clientes),
            parseXLSX : parseXLSX,
            lineas: getXlsxLines
        };
        return service;
        
   function parseXLSX(file){
        var clientes = $meteor.collection(Clientes);
        var reader = new FileReader();        
        reader.onload = function(e){
            var data = e.target.result;
            var libro = XLSX.read(data, {type: "binary"});
            var nombre_hoja = libro.SheetNames[0];
            var hoja = libro.Sheets[nombre_hoja];
            var lineas  = XLSX.utils.sheet_to_json(hoja);
            
            lineas.forEach(function(linea){
                var codigo = linea.Cod,
                    marca = linea.Marca;
                var documento = Clientes.findOne({id: codigo});
                if (documento){
                    // si el documento ya existe nos saltamos los datos de contacto
                    // y directamente añadimos la marca
                    documento[marca] = {
                        piezas_ult_pedido: linea["Pzas último pedido"] || "",
                        fecha_ult_pedido: linea["Fecha ult pedido"] || "",
                        total_anterior: linea["Pzas Fact Total YAG"] || "",
                        piezas_hasta_ahora: linea["Pzas Order YTD.AA"] || ""
                    }
                    Clientes.update(documento._id,documento);
                }else{
                    // No existe el cliente en la DB
                    documento = {
                        nombre: linea.Nombre || "",
                        localidad: fixCiudad(linea.Localidad) || "",
                        provincia: linea.Provincia,
                        id: linea.Cod,
                        cluster: linea.CLUSTER,
                        cp: linea.CP || "",
                        grupo: linea["Nombre grupo"] || ""
                    };
                    documento[marca] = {
                        piezas_ult_pedido: linea["Pzas último pedido"] || "",
                        fecha_ult_pedido: linea["Fecha ult pedido"] || "",
                        total_anterior: linea["Pzas Fact Total YAG"] || "",
                        piezas_hasta_ahora: linea["Pzas Order YTD.AA"] || ""
                    }
                    // pedimos la geo y a la vuelta guardamos el documento
                    locationFactory.locateCP(documento.localidad, documento.provincia).then(
                        function(data){
                            documento.geo =  data;
                            clientes.save(documento);  
                            console.log(documento.geo);                           
                        },
                        function(data){
                            documento.geo = null;
                            clientes.save(documento);                                                         
                        }
                    );
                }
                
            // FIN foreach
            });
        // FIN reader.onLoad
        }
        reader.readAsBinaryString(file);
    }
        
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
    
function fixCiudad(city){
    var i = city.indexOf('(');
    if (i >0){
        return city.substr(0,i-1);
    }else{
        return city;
    }
}