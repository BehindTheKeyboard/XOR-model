import * as fs from 'fs';
import * as path from 'path';
const fsPromises = fs.promises;

// Create a write stream for logging, appending to the log file
// Create a date string that is safe for filenames
const date = new Date().toISOString().replace(/[:]/g, '-').replace(/[.]/g, '-').split('T')[0]; // For daily logs
const time = new Date().toISOString().replace(/[:]/g, '-').replace(/[.]/g, '-').split('T')[1].split('.')[0]; // For more specific time stamps
const logFileName = `log-${date}-${time}.txt`; // Concatenate date and time for the log file name
const logFilePath = path.join(__dirname, '..', 'data', logFileName);

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