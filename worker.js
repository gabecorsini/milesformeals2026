// Cloudflare Worker API for Miles for Meals 2026
// Stores miles data in Cloudflare KV for persistence across all devices

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET - Retrieve current miles data
    if (request.method === 'GET' && url.pathname === '/api/miles') {
      try {
        const data = await env.MILES_DATA.get('current', 'json');
        
        // Return default values if no data exists yet
        if (!data) {
          return new Response(JSON.stringify({
            trainingMiles: 0,
            raceMiles: 0,
            additionalDonations: 0,
            targetMiles: 1000,
            lastUpdated: new Date().toISOString()
          }), { headers: corsHeaders });
        }

        // Backfill targetMiles if missing in existing KV data
        if (typeof data.targetMiles === 'undefined') {
          data.targetMiles = 1000;
        }

        return new Response(JSON.stringify(data), { headers: corsHeaders });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to retrieve data' }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // POST - Update miles data (requires admin PIN)
    if (request.method === 'POST' && url.pathname === '/api/miles') {
      try {
        const body = await request.json();
        
        // Verify admin PIN
        if (body.pin !== env.ADMIN_PIN) {
          return new Response(JSON.stringify({ error: 'Invalid PIN' }), {
            status: 401,
            headers: corsHeaders
          });
        }

        // Validate data
        const trainingMiles = parseFloat(body.trainingMiles) || 0;
        const raceMiles = parseFloat(body.raceMiles) || 0;
        const additionalDonations = parseFloat(body.additionalDonations) || 0;
        const parsedTarget = parseFloat(body.targetMiles);
        const targetMiles = Number.isFinite(parsedTarget) ? Math.max(parsedTarget, 0) : 1000;

        if (trainingMiles < 0 || raceMiles < 0 || additionalDonations < 0 || targetMiles < 0) {
          return new Response(JSON.stringify({ error: 'Values cannot be negative' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        // Save to KV
        const data = {
          trainingMiles,
          raceMiles,
          additionalDonations,
          targetMiles,
          lastUpdated: new Date().toISOString()
        };

        await env.MILES_DATA.put('current', JSON.stringify(data));

        // Automatically create a timestamped backup
        const today = new Date().toISOString().split('T')[0];
        const backupKey = `backup_${today}`;
        await env.MILES_DATA.put(backupKey, JSON.stringify(data));

        // Clean up backups older than 7 days
        const now = new Date();
        for (let i = 8; i <= 30; i++) {
          const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          const oldBackupKey = `backup_${d.toISOString().split('T')[0]}`;
          try {
            await env.MILES_DATA.delete(oldBackupKey);
          } catch (e) {
            // Key may not exist, that's okay
          }
        }

        return new Response(JSON.stringify({ success: true, data }), {
          headers: corsHeaders
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update data' }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // GET - List available backups
    if (request.method === 'GET' && url.pathname === '/api/backups') {
      try {
        const backups = [];
        const now = new Date();
        
        // Check last 7 days for backups
        for (let i = 0; i <= 7; i++) {
          const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          const dateStr = d.toISOString().split('T')[0];
          const backupKey = `backup_${dateStr}`;
          const backup = await env.MILES_DATA.get(backupKey, 'json');
          
          if (backup) {
            backups.push({
              date: dateStr,
              key: backupKey,
              miles: backup.trainingMiles + backup.raceMiles,
              lastUpdated: backup.lastUpdated
            });
          }
        }
        
        return new Response(JSON.stringify({ backups }), { headers: corsHeaders });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to list backups' }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // POST - Restore from backup (requires admin PIN)
    if (request.method === 'POST' && url.pathname === '/api/restore') {
      try {
        const body = await request.json();
        
        // Verify admin PIN
        if (body.pin !== env.ADMIN_PIN) {
          return new Response(JSON.stringify({ error: 'Invalid PIN' }), {
            status: 401,
            headers: corsHeaders
          });
        }

        const backupKey = body.backupKey;
        if (!backupKey || !backupKey.startsWith('backup_')) {
          return new Response(JSON.stringify({ error: 'Invalid backup key' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const backup = await env.MILES_DATA.get(backupKey, 'json');
        if (!backup) {
          return new Response(JSON.stringify({ error: 'Backup not found' }), {
            status: 404,
            headers: corsHeaders
          });
        }

        // Restore by copying backup to 'current'
        await env.MILES_DATA.put('current', JSON.stringify(backup));

        return new Response(JSON.stringify({ success: true, data: backup }), {
          headers: corsHeaders
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to restore backup' }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 404 for other routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
