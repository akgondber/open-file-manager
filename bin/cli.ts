#!/usr/bin/env node

import path from 'node:path';
import minimist from 'minimist';
import { openFileManager } from '../index.js';

const showHelp = () => {
  console.log(`
open-file-manager - Open a file or directory in your system's file manager

Usage:
  open-file-manager [path] [options]

Arguments:
  path              File or directory path to open (default: current directory)

Options:
  -h, --help       Show this help message
  -v, --version    Show version number

Examples:
  open-file-manager                    # Open current directory
  open-file-manager /home/user         # Open specific directory
  open-file-manager ./document.txt     # Open file location
  open-file-manager ../               # Open parent directory
`);
};

const main = async () => {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      f: 'file',
      h: 'help',
      v: 'version'
    }
  });

  if (argv.help) {
    showHelp();
    process.exit(0);
  }

  if (argv.version) {
    const pkg = await import('../package.json', { assert: { type: 'json' } });
    console.log(pkg.default.version);
    process.exit(0);
  }

  const file = argv.file || argv._[0] || '.';

  try {
    await openFileManager(path.resolve(process.cwd(), file));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
