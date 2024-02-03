import * as fs from 'fs';
import * as path from 'path';
const fsPromises = fs.promises;

// Create a write stream for logging, appending to the log file
const logFilePath = path.join(__dirname, '..', 'data', 'log.txt');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Custom log function that writes to the log file
function logToFile(...messages: any[]) {
    const fullMessage = messages.map(m => typeof m === 'object' ? JSON.stringify(m, null, 2) : m).join(' ') + '\n';
    logStream.write(fullMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

export { logToFile };