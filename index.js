// "http://localhost:3000/pelis"
localStorage.clear()
// Activar burger navbar
    const toggleButton = document.getElementsByClassName("toggle-button")[0]
    const navbarLinks =  document.getElementsByClassName("navbar-links")[0]

    toggleButton.addEventListener("click", () => {
        navbarLinks.classList.toggle("active")
    })

// Mostrar o ocultar boton de Añadir Pelicula
    document.querySelector(".mostrarAñadir").addEventListener("click", () => {
        document.querySelector(".añadir").style.display = "block"
    })
    document.querySelector(".ocultarAñadir").addEventListener("click", () => {
        document.querySelector(".añadir").style.display = "none"
    })

// Parametros formulario
    const titulo = document.getElementById("titulo")
    const año = document.getElementById("año")
    const genero = document.getElementById("genero")
    const imagen = document.getElementById("imagen")

// BOTON POST
    const btnEnviar = document.getElementById("btnEnviar")  


// DATOS por peli (pelicula.html)
    const tituloDatosPeli = document.getElementById("tituloDatosPeli")
    const añoDatosPeli = document.getElementById("añoDatosPeli")
    const generoDatosPeli = document.getElementById("generoDatosPeli")
    const imgDatosPeli = document.getElementById("imgDatosPeli")




// GET 
    fetch("http://localhost:3000/pelis/")
    .then(response => {return response.json()})
    .then(data => {
        console.log(data)
        data.forEach(item => {
            const peli = `<div class='recuadroPeli'>
                            <p>` + item.id + ` - <b>` + item.titulo + `</b></p>
                            <p>`+ item.año + `</p>
                            <p>`+ item.genero + `</p>
                            <img src='../imgs/`+item.imagen+`'><br>
                            <button id='btnMostrarDatosPelicula' onclick='mostrarDatosPelicula(`+item.id+`)'>Datos</button><br>
                            <button id='btnEliminar' onclick='deleteInfo(`+item.id+`)'>Borrar</button>
                        <div>`;
            document.querySelector('#pelis').insertAdjacentHTML("beforeend", peli)

        })
    })
    .catch(error => console.log(error))




// POST
    btnEnviar.addEventListener("click", postInfo)

    async function postInfo(e){
        e.preventDefault()

        const imgNombre = imagen.value.substring(12, imagen.value.lenght);
        console.log(imgNombre)

        fetch("http://localhost:3000/pelis/", 
                { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        titulo: titulo.value,
                        año: año.value,
                        genero: genero.value,
                        imagen: imgNombre
                    })
                })
        
        window.location.reload()
    }


// DELETE 
    async function deleteInfo(id) {
        console.log(id)
        fetch(`http://localhost:3000/pelis/` + id, {
            method: "DELETE"
        }) 
    }



    // MOSTRAR DATOS PELICULA
    async function mostrarDatosPelicula(id) {
        localStorage.setItem("id", id)
        window.location.href = "pelicula.html"
        
    }
