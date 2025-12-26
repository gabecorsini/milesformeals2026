# Cloudflare Worker Deployment Guide

## Quick Setup (10 minutes)

### Step 1: Install Wrangler CLI

Open PowerShell and run:
```powershell
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```powershell
wrangler login
```
This opens your browser to authenticate with Cloudflare.

### Step 3: Create KV Namespace

Navigate to your project:
```powershell
cd c:\Users\GabeCorsini\Documents\Code\miles-for-meals-2026
```

Create the KV namespace:
```powershell
wrangler kv:namespace create MILES_DATA
```

**Important:** Copy the `id` from the output. It looks like:
```
{ binding = "MILES_DATA", id = "abc123def456..." }
```

### Step 4: Update wrangler.toml

Open `wrangler.toml` and replace `YOUR_KV_NAMESPACE_ID` with the ID from Step 3.

### Step 5: Set Admin PIN Secret

```powershell
wrangler secret put ADMIN_PIN
```

When prompted, enter: `2026` (or whatever PIN you want)

This securely stores the PIN in Cloudflare (not in your code).

### Step 6: Deploy Worker

```powershell
wrangler deploy
```

The output shows your worker URL:
```
Published miles-for-meals-api
  https://miles-for-meals-api.YOUR-SUBDOMAIN.workers.dev
```

**Copy this URL!**

### Step 7: Update script.js

Open `script.js` and find line 4:
```javascript
this.API_URL = 'https://miles-for-meals-api.YOUR-SUBDOMAIN.workers.dev/api/miles';
```

Replace `YOUR-SUBDOMAIN` with your actual subdomain from Step 6.

### Step 8: Commit and Push

```powershell
git add .
git commit -m "Connect to Cloudflare Worker API for cloud storage"
git push
```

### Step 9: Test It!

1. Go to `https://milesformeals2026.com/admin.html`
2. Enter PIN: `2026`
3. Update miles (e.g., Training: 10, Race: 3.1)
4. Click "Update Data"
5. Open a new incognito window
6. Go to `https://milesformeals2026.com`
7. **You should see the same data!** ✅

## What You Get (Free Tier)

✅ **100,000 requests/day** (way more than needed)  
✅ **1 GB storage** in KV  
✅ **Global CDN** (fast everywhere)  
✅ **No credit card required**  

## Troubleshooting

**"Invalid PIN" error:**
- Make sure you ran: `wrangler secret put ADMIN_PIN`
- The PIN must be `2026` (or whatever you set)

**Main page shows 0 miles:**
- Check browser console (F12) for errors
- Verify `script.js` has the correct worker URL
- Make sure you pushed changes to GitHub

**Worker deployment failed:**
- Run `wrangler whoami` to check login
- Make sure you're in the project directory
- Check that `wrangler.toml` has the correct KV namespace ID

## Changing the PIN Later

To update the admin PIN:
```powershell
wrangler secret put ADMIN_PIN
```

Then update the PIN in `admin.html` (line ~230):
```javascript
const ADMIN_PIN = 'your-new-pin';
```

## How It Works

1. **Visitor opens site** → Gets miles data from Cloudflare KV (cloud)
2. **Admin updates miles** → Sends to Worker with PIN → Saves to KV
3. **Everyone sees same data** → No localStorage, all in the cloud
4. **Auto-refreshes** → Main page checks for updates every 5 minutes

Your mom just uses the admin form—nothing changes for her!
