import { config } from 'dotenv';
import { google } from 'googleapis';

config({ path: '.env', quiet: true });

export async function getTasks() {
  try {
    const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Rahul P!A6:Z',
    });

    const rows = result.data.values;

    return rows;
  } catch (err) {
    console.log('Failed to get data');
    console.log('Error: ', err);
  }
}
