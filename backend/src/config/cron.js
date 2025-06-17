import cron from 'node-cron';
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();


// Schedule a task to run every 14 minutes
const job = cron.schedule("*/14 * * * *", () => {
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200) {
                consosle.log('GET request sent successfully');
            } else {
                console.error(`GET request failed: ${res.statusCode}`);
            }
        })
        .on('error', (err) => {
            console.error('Error while sending request', err);
        });
});

export default job;

// CRON JOB EXPLANATION
// Cron jobs are scheduled tasks that run at specified intervals.
// we want to send 1 GET request for every 14 minutes.

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields:

//! MINUTES, HOURS, DAY_OF_MONTH, MONTH, DAY_OF_WEEK

//? EXAMPLES && EXPLANATIONS
//* 14 * * * * - This runs every 14 minutes.
//* 0 0 * * 0 - This runs at midnight every Sunday.
//* 30 3 15 * * - This runs at 3:30 AM on the 15th of every month.
//* 0 0 1 1 * - This runs at midnight on January 1st every year.
//* 0 * * * * - This runs at the start of every hour.
