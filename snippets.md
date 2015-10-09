// Weather api de openmaps
//if (doc.localidad) {
if (false) { //desactiva clima, la api no parece tirar bien
//mirar el plnkr con api de yahoo
// Generar mejor como un servicio aparte. Ver to-do
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
			//old angularfire way
			//clientesRef.child(codigo).update(doc);
		});
	}