window.onload = function(){
    fetch("https://api.chucknorris.io/jokes/categories")
    .then(Response=>Response.json())
    .then((dato) => {
                    let categor = dato
                    //console.log(categor);

                    categor.forEach(elemento => {
                        let opcion = document.createElement('option')
                        opcion.value = elemento;
                        opcion.text = elemento;
                        document.getElementById('SelCategorias').appendChild(opcion);
                    })
                    
                });
    document.getElementById('peticion').addEventListener("click",()=>{
        let chisteCategoria = document.getElementById('SelCategorias').value;
        let url = 'https://api.chucknorris.io/jokes/random?category='+
        chisteCategoria;
        //console.log(url);
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(dato =>{
            const dChiste = document.getElementById('divChiste');
            dChiste.textContent = dato.value
        })
        .catch(error => {console.error("Error:", error);});
    })
}