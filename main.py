# main.py

from llamaBackend import Backend
from llamaFrontend import LlamaFrontend

from programmer import Programmer

def main():
    api_key = "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"
    backend = Backend(api_key)
    
    # Generar código basado en el módulo "CATS"
    response_content = backend.generate_code("Cats")
    
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
