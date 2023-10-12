import fs from 'fs/promises';
import path from 'path';

// Obtiene la ruta de la carpeta actual
const currentDirectory = process.cwd();

// Función para obtener las carpetas en una ruta dada
async function getFolders(dir) {
  const files = await fs.readdir(dir);
  return files.filter(async (file) => {
    const stats = await fs.stat(path.join(dir, file));
    return stats.isDirectory();
  });
}

(async () => {
  try {
    const folders = await getFolders(currentDirectory);

    folders.forEach((folder) => {
      console.log('Carpeta padre:', currentDirectory);
      console.log('Carpeta hija:', path.join(currentDirectory, folder));
      console.log('---');
    });
  } catch (err) {
    console.error('Error al leer el directorio:', err);
  }
})();

