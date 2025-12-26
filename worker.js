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
            lastUpdated: new Date().toISOString()
          }), { headers: corsHeaders });
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

        if (trainingMiles < 0 || raceMiles < 0 || additionalDonations < 0) {
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
          lastUpdated: new Date().toISOString()
        };

        await env.MILES_DATA.put('current', JSON.stringify(data));

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

    // 404 for other routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
