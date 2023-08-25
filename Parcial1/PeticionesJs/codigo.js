const btnFetch = document.getElementById("btnApi");
        const Titulo = document.getElementById("hTitulo");
        const apiURL = "https://api.adviceslip.com/advice";
        //Api fetch
        btnFetch.addEventListener("click", () => {
        fetch(apiURL) 
            .then(response => {
            if (!response.ok) {
                //throw new Error(`Error de red: ${response.status}`);
                throw new Error('Error de red: ' + response.status);
            }
            return response.json();
            })
            .then(data => {
                const advice = data.slip.advice; 
                Titulo.textContent = advice; 
            })
            .catch(error => {console.error("Error:", error);});
        });
        //xml http request
        const btnRequest = document.getElementById("btnXML");
        btnRequest.addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", apiURL);
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        const advice = data.slip.advice;
                        Titulo.textContent = advice;
                    } catch (error) {
                        console.error("Error:", error);
                    }
                } else {
                    console.error('Error de red:', xhr.status);
                }
            };
            
            xhr.onerror = () => {
                console.error("Error de red");
            };
            
            xhr.send();
        });
        //Axios
        const btnAx= document.getElementById("btnAxios");
        btnAx.addEventListener("click", () => {
            axios.get(apiURL)
            .then((respuesta2) =>{
                //console.log(respuesta2.data.slip.advice);
                Titulo.textContent = respuesta2.data.slip.advice;
            })
            .catch(() =>{
                console.log('no funciono el boton axios.')
            });
        });
        //jquey
        const btnJQ= document.getElementById("btnQuery");
        btnJQ.addEventListener("click", () => {
            $.ajax({
                url: apiURL,
                method: 'GET',
                dataType: 'json'
            })
            .done(function(data) {
                const advice = data.slip.advice;
                $('#hTitulo').text(advice);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", errorThrown);
            });
        });
        // promesa
        const btnProm= document.getElementById("btnPromesa");
        btnProm.addEventListener("click", () => {
            fetch(apiURL)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Error de red: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    const advice = data.slip.advice;
                    Titulo.textContent = advice;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        });
        //async await
        const btnAsync= document.getElementById("btnAsyncAwait");
        btnAsync.addEventListener("click", async () => {
            let headersList = {
                "Accept": "*/*"
            }

           let response = await fetch(apiURL, { 
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            //console.log(data.slip.advice);
            document.getElementById("hTitulo").innerText=data.slip.advice+' ';
        });
