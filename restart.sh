#!/bin/bash

# Directorios a eliminar
dirs=("controllers" "models" "routes", "views", "script", "style")

# Bucle para eliminar cada directorio
for dir in "${dirs[@]}"; do
  if [ -d "$dir" ]; then
    rm -rf "$dir"
    echo "Directorio $dir eliminado."
  else
    echo "El directorio $dir no existe."
  fi
done
