let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 10000){
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async() =>{
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=84a990c3ec4e2e7f5e0256231eced6b5&language=es-MX&page=${pagina}`);

    // const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")

    //console.log(respuesta);
    // Si la respuesta es correcta
		if(respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = ' ';
            datos.results.forEach(pelicula => {
                //console.log(pelicula.title);
                peliculas += `
                <div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;
            //console.log(datos.results);
        } else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

    } catch (error){
        console.log(error);
    }
    

}

cargarPeliculas();


// const url = 'https://open-weather-map27.p.rapidapi.com/weather';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '7b70d9728cmsh6583a3badfd6b6bp1b00f1jsn711f3101e4ab',
// 		'x-rapidapi-host': 'open-weather-map27.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }