import subprocess
import os

class Programmer:
    def __init__(self, backend):
        self.backend = backend

    def save_backend_to_js(self, filename="backend-ia.js"):
        response_content = self.backend.load_response()
        if response_content:
            with open(filename, "w") as js_file:
                js_file.write(response_content)
            print(f"Contenido del backend guardado en '{filename}'.")
        else:
            print("No se pudo cargar el contenido del backend.")

    def execute(self, filename="backend-ia.js"):
        if os.path.exists(filename):
            try:
                # Ejecutar el archivo JS usando Node.js
                result = subprocess.run(["node", filename], capture_output=True, text=True)
                print(f"Resultado de la ejecución:\n{result.stdout}")
                if result.stderr:
                    print(f"Errores durante la ejecución:\n{result.stderr}")
            except Exception as e:
                print(f"Error al ejecutar el script: {e}")
        else:
            print(f"El archivo '{filename}' no existe.")

    def removeTags(self, filename="frontend-ia.js"):
        """Remueve los tags @CODEJS y @CODEJS del archivo backend."""
        try:
            with open(filename, 'r') as file:
                content = file.read()

            # Remover los tags @CODEJS y @CODEJS-END
            cleaned_content = content.replace('</CODEJS>', '').replace('<CODEJS>', '')
            #cleaned_content = content.replace('@CODEJSEND', '')

            # Guardar el contenido limpio de nuevo en el archivo
            with open(filename, 'w') as file:
                file.write(cleaned_content)

            print(f"Tags @CODEJS y @CODEJS-END eliminados de {filename}")

        except FileNotFoundError:
            print(f"El archivo {filename} no fue encontrado.")
        except Exception as e:
            print(f"Ocurrió un error al eliminar los tags: {e}")

