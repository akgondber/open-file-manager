# open-file-manager [![NPM version](https://img.shields.io/npm/v/open-file-manager.svg?style=flat)](https://www.npmjs.com/package/open-file-manager) [![NPM monthly downloads](https://img.shields.io/npm/dm/open-file-manager.svg?style=flat)](https://npmjs.org/package/open-file-manager) [![NPM total downloads](https://img.shields.io/npm/dt/open-file-manager.svg?style=flat)](https://npmjs.org/package/open-file-manager)

> Cross-platform utility to open a file or directory in the system's default file manager (Finder, Explorer, Nautilus, etc.)

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save open-file-manager
```

## Usage

```typescript
import { openFileManager } from "open-file-manager";
// or
import openFileManager from "open-file-manager";
```

## API

### openFileManager

Opens a file or directory in the system's default file manager.

```typescript
export const openFileManager = async (dirname?: string): Promise<void>;
```

**Basic usage:**

```ts
// Open current directory
await openFileManager();

// Open specific directory
await openFileManager("/home/user/documents");

// Open file location (selects the file in the file manager)
await openFileManager("./package.json");
```

**Parameters:**

**pathname** (optional)

* Type: `string`
* Default: `'.'` (current directory)
* Path to the file or directory to open. Can be absolute or relative.

**Returns:**

* Type: `Promise<void>`
* Resolves when the file manager opens successfully
* Throws an error if the operation fails

**Platform behavior:**

* **Windows**: Uses `explorer.exe`. When opening a file, it selects the file in Explorer.
* **macOS**: Uses `open -R` to reveal the item in Finder.
* **Linux/Unix**: Tries multiple file managers in order: xdg-open, nautilus, dolphin, thunar, pcmanfm, nemo.

**Error handling:**

```ts
try {
  await openFileManager("/path/to/file");
} catch (error) {
  console.error("Failed to open file manager:", error.message);
}
```

## CLI

```bash
# Open current directory
open-file-manager

# Open specific directory
open-file-manager /home/user/documents

# Open file location
open-file-manager ./package.json

# Show help
open-file-manager --help

# Show version
open-file-manager --version
```

## Examples

### Open a project's dist folder

```ts
import { openFileManager } from "open-file-manager";

await openFileManager("./dist");
```

### Open a file's location

```ts
// This will open the file manager and select/highlight the file
await openFileManager("./README.md");
```

### Use in npm scripts

```json
{
  "scripts": {
    "open:dist": "open-file-manager ./dist",
    "open:current": "open-file-manager"
  }
}
```

### Cross-platform usage

```ts
import { openFileManager } from "open-file-manager";
import path from "node:path";

// Works on Windows, macOS, and Linux
await openFileManager('/path/to/dir');
```

## Notes

* All paths are resolved relative to the current working directory
* The function is async and returns a Promise
* On Windows, if a file doesn't exist, it will open the parent directory instead
* On Linux, the function will try multiple file managers and use the first one available
* Supports FreeBSD, OpenBSD, and SunOS in addition to major platforms

## Related

You might also be interested in:

* [open-finder-dialog](https://www.npmjs.com/package/open-finder-dialog): Open a finder dialog window (finder prompt) programmatically. Only works on MacOS. | [homepage](https://github.com/jonschlinkert/open-finder-dialog "Open a finder dialog window (finder prompt) programmatically. Only works on MacOS.")
* [open-linux-file-dialog](https://www.npmjs.com/package/open-linux-file-dialog): Open a file dialog window programmatically to allow the user to select one or more… [more](https://github.com/jonschlinkert/open-linux-file-dialog) | [homepage](https://github.com/jonschlinkert/open-linux-file-dialog "Open a file dialog window programmatically to allow the user to select one or more files. Only works on Linux. No dependencies. Supports zenity (GNOME), kdialog (KDE), yad (Yet Another Dialog), qarma (Qt-based), matedialog (MATE), rofi (window switcher wi")
* [open-windows-file-dialog](https://www.npmjs.com/package/open-windows-file-dialog): Programmatically open a file dialog window (explorer) for picking files. Only works on Windows. Also… [more](https://github.com/jonschlinkert/open-windows-file-dialog) | [homepage](https://github.com/jonschlinkert/open-windows-file-dialog "Programmatically open a file dialog window (explorer) for picking files. Only works on Windows. Also see: open-finder-dialog, open-linux-file-dialog, and open-file-manager-dialog for other platforms.")

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2025, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the MIT License.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on May 25, 2025._