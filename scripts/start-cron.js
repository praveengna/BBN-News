const http = require('http');
const https = require('https');

// The endpoint for the Next.js API route
const CRON_URL = process.env.CRON_URL || 'http://localhost:3000/api/cron/aggregate';
// Interval in milliseconds (1 minute = 60000 ms)
const INTERVAL = 60 * 1000;

console.log(`[Cron] Starting background RSS aggregator...`);
console.log(`[Cron] Target URL: ${CRON_URL}`);
console.log(`[Cron] Frequency: Every 1 minute`);

function triggerAggregate() {
  console.log(`\n[Cron] Triggering RSS aggregation at ${new Date().toISOString()}...`);
  
  const client = CRON_URL.startsWith('https') ? https : http;
  
  const req = client.get(CRON_URL, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`[Cron] Response Status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log(`[Cron] Aggregation successful.`);
      } else {
        console.log(`[Cron] Aggregation returned non-200 status. Response: ${data.substring(0, 100)}...`);
      }
    });
  }).on('error', (err) => {
    console.error(`[Cron] Error triggering aggregation: ${err.message}`);
    console.log(`[Cron] Make sure your Next.js server is running!`);
  });
  
  req.setTimeout(300000, () => {
    console.log('[Cron] Request timed out after 5 minutes.');
    req.destroy();
  });
}

// Trigger immediately on start
triggerAggregate();

// Then run every 1 minute
setInterval(triggerAggregate, INTERVAL);
