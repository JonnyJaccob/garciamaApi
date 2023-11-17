const OpenApiSnippet = require('openapi-snippet');

fetch('http://localhost:8083/api-docs-json')
    .then(respuesta => respuesta.json() )
            .then(desc => {//console.log(desc)
                //generar codigo para toda la api.
                const openApi = desc
                const targets = ['javascript_xhr','go_native']

                try{
                    //Para toda la api.
                    const results = OpenApiSnippet.getSnippets(openApi, targets)
                    console.log('^^^^^^^^^^^^') 
                    console.log(results)
                    console.log('----------')
                    //Para solo un endpoint.
                    const results2 = OpenApiSnippet.getEndpointSnippets(openApi,'/alumnos', 'put', targets)
                    console.log('^^^^^^^^^^^^') 
                    console.log(results2)
                    console.log('----------')
                }catch(err){
                    console.log("Ocurrio un error: " + err);
                }
            });