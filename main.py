# main.py
import os
from llamaBackend import Backend
from llamaFrontend import LlamaFrontend

from programmer import Programmer

def main():
    api_key = api_key = os.getenv("LLAMA_API_KEY")
    backend = Backend(api_key)
    
    # Generar código basado en el módulo "CATS"
    response_content = backend.generate_code("User")
    
    # Guardar la respuesta generada en archivos
    backend.save_response(response_content)
    
    # Cargar y mostrar la respuesta guardada
    # loaded_response = backend.load_response()
    # if loaded_response:
    #     print("Respuesta cargada:", loaded_response)


    # Define task programmer here
    programmer = Programmer(backend)
    programmer.execute("backend-ia.js")

    print("Generando backend exitosamente!")


    frontend = LlamaFrontend(api_key)
    
    # Generar el código frontend
    response_content = frontend.generate_frontend_code(backend_response="Respuesta del backend", additional_payload="1) el estilo de fondo debe ser azul. Y centrado el contenido. 2) agregar un formulario para guardar los datos al modelo. ")
    
    # Guardar la respuesta generada
    frontend.save_response(response_content)
    programmer = Programmer(backend)
    programmer.removeTags(filename="frontend-ia.js")
    programmer.execute("frontend-ia.js")
    print("Generando Frontend... exitosamente!")



if __name__ == "__main__":
    main()
