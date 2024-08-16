from openai import OpenAI
import json

class Backend:
    def __init__(self, api_key, base_url="https://integrate.api.nvidia.com/v1"):
        self.client = OpenAI(
            base_url=base_url,
            api_key=api_key
        )
    
    def generate_code(self, modulename):
        prompt_text = f"""
        Asume eres un experto en programación nodejs, backend, API developer y DevOps.
        Basado en el siguiente proyecto, tengo escrita la forma de mis modelos, controladores, rutas y vistas de mi arquitectura base.
        Ahora quiero que generes uno llamado {modulename} y me generes el codeController, codeModel, y codeRoutes. Todo esto Basado en el codigo nodejs dentro de @CODEJS
        Y devuelveme un solo archivo que contenga todo lo que esta dentro de @CODEJS y remueve ese tag y el cierre (@CODEJS-END)
        y omite la salida de codigo ```javascript 
        y omite detalles en la salida como "Aquí te dejo el código...",

        Requerimientos:
        1) El modelo debe contemplar los siguientes campos:
           - name: string
           - age: number
           - sex: string
        2) En el message del response para el list, concatenar a lo actual "Estamos readys".

        @CODEJS
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

        // Nombres de archivo
        const controllerFileName = 'controllers/cats.js';
        const modelFileName = 'models/cats.js';
        const routerFileName = 'routes/cats.js';
        const viewFileName = 'views/cats/index.html';

        // Llama a la función para escribir el código en los archivos respectivos
        writeCodeToFile(controllerFileName, codeController);
        writeCodeToFile(modelFileName, codeModel);
        writeCodeToFile(routerFileName, routerCode);
        writeCodeToFile(viewFileName, viewCode);

        @CODEJS-END
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
        # Guardar la respuesta en un archivo JSON
        output_data = {
            "response": response_content
        }

        with open("output_backend.json", "w") as json_file:
            json.dump(output_data, json_file, indent=4)

        # Guardar la respuesta en un archivo JS
        with open("backend-ia.js", "w") as js_file:
            js_file.write(response_content)

        print("Respuesta guardada en 'output.json' y 'index-ia.js'")

    def load_response(self):
        # Cargar la respuesta desde el archivo JSON
        try:
            with open("output.json", "r") as json_file:
                output_data = json.load(json_file)
                response_content = output_data.get("response", "")
                return response_content
        except FileNotFoundError:
            print("El archivo 'output.json' no existe.")
            return None


