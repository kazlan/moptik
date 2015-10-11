angular
    .module('optikApp')
    .filter('filtroClientes', filtroClientes);

filtroClientes.$inject= ['$filter'];
// Input: Array de objetos Cliente
// query: Parámetros a filtrar (nombre, ciudad, meses por ahora..)	
function filtroClientes($filter){
    return function(input, query){
        var campos = {
            nombre: query.nombre,
            localidad: query.localidad
            };
        if (query.meses) {
            var lista = $filter('filter')(input, campos);
            return lista.filter( function(item){
                var fecha = moment().subtract(query.meses, 'month');
                var thf = false,
                    max = false;
                if (item.THF){
                    thf = moment(item.THF.fecha_ult_pedido).isAfter(fecha);
                }
                if (item.MAX){
                    max = moment(item.MAX.fecha_ult_pedido).isAfter(fecha);
                }
                return thf || max
            });
        } else
        {
            return $filter('filter')(input, campos);
        }           
    }
}	

/*
    $scope.Clientes.$loaded()
        .then ()->
        $scope.$watch 'query'
            , (q)->
                if !q then return
                campos = {}
                if q.nombre then campos.nombre=q.nombre
                if q.ciudad then campos.localidad=q.ciudad
                if q.meses
                    lista = $filter('filter')($scope.Clientes, campos)
                    $scope.clientesFiltro = lista.filter (item)->
                        fecha = moment().subtract(q.meses,'month')
                        thf = max = false
                        if item.THF then thf = moment(item.THF.fecha_ult_pedido).isAfter(fecha)
                        if item.MAX then max = moment(item.MAX.fecha_ult_pedido).isAfter(fecha)
                        return thf || max
                else
                    $scope.clientesFiltro = $filter('filter')($scope.Clientes, campos)

            ,true
*/
