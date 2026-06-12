import * as fs from 'node:fs';
import * as fsPromise from 'node:fs/promises';
import path from 'node:path';

// import { fileURLToPath } from "node:url";

// const __filename = fileURLToPath(import.meta.url)

// console.log('meta.url: ', import.meta.url)
// console.log('__filename: ', __filename)

// console.log('Process.cwd: ', process.cwd())

const TARGET_DIR = '/home/rahul/Downloads';
const FILE_FORMATS = [
  {
    type: 'audio',
    formats: ['.mp3', '.aac', '.ogg', '.m4a', '.wma', '.opus', '.amr', '.flac', '.alac', '.ape', '.wav', '.aiff', '.pcm', '.dsd'],
  },
  {
    type: 'video',
    formats: ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.wmv', '.flv', '.m4v', '.avchd', '.mpeg', '.mpg', '.3gp'],
  },
  {
    type: 'image',
    formats: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.tif', '.ico', '.avif', '.heic', '.ai', '.psd'],
  },
  {
    type: 'Document',
    formats: [
      '.pdf',
      '.html',
      '.htm',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.odt',
      '.ods',
      '.odp',
      '.txt',
      '.rtf',
      '.md',
      '.csv',
      '.epub',
      '.mobi',
    ],
  },
  {
    type: 'Archives',
    formats: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.iso', '.dmg'],
  },
  {
    type: 'Developer',
    formats: [
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.py',
      '.rb',
      '.php',
      '.go',
      '.cpp',
      '.c',
      '.json',
      '.xml',
      '.yaml',
      '.yml',
      '.toml',
      '.css',
      '.scss',
      '.sass',
      '.less',
    ],
  },
];

fs.readdir(TARGET_DIR, { withFileTypes: true }, async (err, files) => {
  if (err) {
    console.log('Failed to read directory: ', TARGET_DIR);
    console.log('Error: ', err);
    return;
  }

  if (files.length === 0) {
    console.log('No files to organize');
    return;
  }

  for (const file of files) {
    if (file.isDirectory()) continue;
    const fileExtension = path.extname(file.name);

    // Get the file format
    const fileFormat = FILE_FORMATS.find((val) => val.formats.includes(fileExtension));
    if (!fileFormat) {
      console.log('File extension not configured.');
      console.log('File: ', file);
      console.log('File extension: ', fileExtension);
      console.log('');
      continue;
    }

    // Check if the directory exists and if not create the directory
    if (!fs.existsSync(`${TARGET_DIR}/${fileFormat.type}`)) {
      try {
        await fsPromise.mkdir(`${TARGET_DIR}/${fileFormat.type}`);
      } catch (err) {
        console.log('Failed to create dir for: ', fileFormat.type);
        console.log('Error: ', err);
        continue;
      }
    }

    // Move the file
    fs.rename(`${TARGET_DIR}/${file.name}`, `${TARGET_DIR}/${fileFormat.type}/${file.name}`, (err) => {
      if (err) {
        console.log('Failed to move file.');
        console.log('Filename: ', file.name);
        console.log('To dir: ', fileFormat.type);
      }
      console.log('File moved successfully');
      console.log('Filename: ', file.name);
    });
  }
});
