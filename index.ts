import path from 'node:path';
import util from 'node:util';
import cb from 'node:child_process';

const managers = ['xdg-open', 'nautilus', 'dolphin', 'thunar', 'pcmanfm', 'nemo'];

export const openFileManager = async (pathname = '.') => {
  const exec = util.promisify(cb.exec);
  const filepath = path.resolve(process.cwd(), pathname);
  let lastError;

  try {
    switch (process.platform) {
      case 'win32':
        return exec(`start /b explorer /select,"${filepath}"`);
      case 'darwin':
        return exec(`open -R "${filepath}"`);
      case 'linux':
      case 'freebsd':
      case 'openbsd':
      case 'sunos':
        // Try multiple file managers in order of preference
        for (const manager of managers) {
          try {
            // Check if the manager exists
            await exec(`which ${manager}`);

            // Try to open with the manager
            if (manager === 'xdg-open') {
              return exec(`${manager} "${path.dirname(filepath)}"`);
            }

            return exec(`${manager} "${filepath}"`);
          } catch (err) {
            lastError = err;
            continue;
          }
        }

        throw new Error(`No file manager found. Tried: ${managers.join(', ')}. Last error: ${lastError?.message}`);
      default:
        throw new Error(`Unsupported platform: ${process.platform}`);
    }
  } catch (error) {
    // Windows explorer returns exit code 1 when the file doesn't exist
    if (process.platform === 'win32' && error.code === 1) {
      // Try opening the parent directory
      const parentDir = path.dirname(filepath);
      return exec(`explorer "${parentDir}"`);
    }

    throw error;
  }
};

export default openFileManager;
