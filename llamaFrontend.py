from openai import OpenAI
import json

class LlamaFrontend:
    def __init__(self, api_key, base_url="https://integrate.api.nvidia.com/v1"):
        self.client = OpenAI(base_url=base_url, api_key=api_key)

    def generate_frontend_code(self, backend_response=None, additional_payload=None):
     
        combined_payload = backend_response if backend_response else ""
        if additional_payload:
            combined_payload += additional_payload
        prompt_text = f"""
Ahora tienes un rol de  diseñador web, ui, uix, expert developer vuejs, angular, next, react & figma
Basado en esta ruta y endpoint devuelveme un solo archivo que contenga todo lo que esta dentro de @CODEJS 
omite todo detalle en la respuesta  explicaciones y omite en la salida  el wrap de codigo ```javascript @CODEJS, @CODEJS-END 
@endpoint http://localhost:3000/api/users

@response 
{{"message":"Estamos readys","data":[{{"_id":"66b3eab47716144f8c78963e","username":"zoe","password":"$2a$05$R3lY9Vbu4YDpU8iw6IuZreMFKHi16HuEBnHDQt4Jay3T6ySgmSLoO","email":"zoe@gmail.com","name":"zoe","mobile":"3045657832","roles":["user"],"isActive":false,"__v":0}}]}}; 

{combined_payload}


1) crear una pagina  html/css/js que haga el  request al endpoint expuesto de manera simple, sin errores. Y todo englobalo dentro de @CODEJS 
2) toma como referencia la renderizacion de datos asi: 

fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {{
        const usuariosDiv = document.getElementById('usuarios');
        const response = data.data;
        console.log(response);

        // Iterar sobre cada usuario en la respuesta
        for (var i = 0; i < response.length; i++) {{  // Cambiado `i <= response.length` a `i < response.length`
            var usuario = response[i];  // Cambié `user` a `usuario` para usar la misma variable

            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('usuario');
    
            // Concatenar la información del usuario al div
            usuarioDiv.textContent = 'Nombre: ' + usuario.name + ', Email: ' + usuario.email;
    
            // Agregar el div al contenedor principal
            usuariosDiv.appendChild(usuarioDiv);
        }}
        
    }})
    .catch(error => console.error('Error:', error));

                        
<CODEJS>
const fs = require('fs');
const path = require('path');

// Función para crear la ruta de la carpeta si no existe
const ensureDirectoryExistence = (filePath) => {{
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {{
        return true;
    }}
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}};

// Función para escribir el código en un archivo
const writeCodeToFile = (fileName, code) => {{
    ensureDirectoryExistence(fileName); // Asegura que la ruta de la carpeta exista
    fs.writeFile(fileName, code, (err) => {{
        if (err) {{
            console.error('Error al escribir en el archivo:', err);
        }} else {{
            console.log(`Código escrito en el archivo {{fileName}} exitosamente.`);
        }}
    }});
}};


const codeIndex = "";
const cssCode = "";
const jsCode = "";

// Nombres de archivo
const indexFileName = 'index.html';
const cssFileName = 'style/style.css';
const jsFileName = 'script/script.js';

// Llama a la función para escribir el código en los archivos respectivos
writeCodeToFile(indexFileName, codeIndex);
writeCodeToFile(cssFileName, cssCode);
writeCodeToFile(jsFileName, jsCode);
</CODEJS>
"""

        completion = self.client.chat.completions.create(
            model="meta/llama-3.1-8b-instruct",
            messages=[{"role": "user", "content": prompt_text}],
            temperature=0.2,
            top_p=0.7,
            max_tokens=2024,
            stream=True
        )

        response_content = ""

        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                response_content += chunk.choices[0].delta.content

        return response_content

    def save_response(self, response_content):
        if response_content:
            # Guardar la respuesta en un archivo JSON
            output_data = {
                "response": response_content
            }

            with open("frontend-output.json", "w") as json_file:
                json.dump(output_data, json_file, indent=4)

            with open("frontend-ia.js", "w") as js_file:
                js_file.write(response_content)

            print("Respuesta guardada en 'frontend-output.json' y 'frontend-ia.js'")
        else:
            print("No se generó ningún contenido para guardar.")

