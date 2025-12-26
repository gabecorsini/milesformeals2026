# Miles for Meals 2026

Charity fundraising site for Missy Watson's 2026 running challenge. Tracks miles run and auto-calculates donations ($1 per training mile, $2 per race mile) to the local food bank.

## Quick Start

**Public Site**: `index.html` - View progress, miles, and donations
**Admin**: `admin.html` - PIN 2026 to update miles, donations, and target

## Features

- **Live Tracker**: Shows training miles, race miles, total donations
- **Dynamic Target**: Edit your goal anytime from admin
- **Quick Add**: Easily increment miles or donations without replacing values
- **Auto Backups**: Daily snapshots stored in KV, restore anytime
- **Mobile Friendly**: Fully responsive design

## Tech Stack

- HTML/CSS/JavaScript frontend
- Cloudflare Worker + KV backend
- Automatic daily backups with 7-day retention

## Admin Features

From the PIN-protected admin panel:
- Update target miles goal
- Quick add training miles
- Quick add donations
- Restore from automatic daily backups

## Deployment

### GitHub Pages (Recommended)
1. Create a GitHub repository
2. Push all files to the repository
3. Enable GitHub Pages in repository settings
4. Set the source to the main branch
5. Site will be available at `https://username.github.io/miles-for-meals-2026`

### Other Options
- Vercel (similar to GitHub Pages, very fast)
- Netlify (drag-and-drop deployment)
- Traditional web hosting (any provider)

## Customization

### Update Contact Links
In `index.html`, modify the contact section:
```html
<a href="mailto:missy@example.com" class="contact-button email-button">
<a href="https://venmo.com/@missywatson" target="_blank" class="contact-button venmo-button">
<a href="https://www.instagram.com/missywatson" target="_blank" class="contact-button social-button">
```

### Adjust Color Scheme
Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #dc2626;
    --accent-color: #f59e0b;
    /* ... other colors ... */
}
```

### Change Donation Goal
In `script.js`, update the target miles in the `updateDisplay()` method:
```javascript
const targetMiles = 1200; // Change this value
```

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Future Enhancements

### Potential Additions
1. **Garmin API Integration**: Automatically sync running data
   - Requires Garmin API access
   - May need unofficial API or web scraping fallback
   
2. **Social Media Integration**: Direct social sharing
   - Share progress on Facebook/Instagram
   - Tweet milestones

3. **Email Notifications**: Send updates when milestones are reached
   
4. **Leaderboard**: Track multiple runners

5. **Advanced Analytics**: Charts and graphs of progress over time

6. **Backend Database**: Store data on a server instead of localStorage
   - Google Firebase
   - Supabase
   - Traditional database

## Security Notes
- No sensitive data is stored
- Data is stored locally in the browser
- Clearing browser data will reset the tracker
- Consider password-protecting `admin.html` if deployed publicly
  - Use GitHub Pages basic auth
  - Use server-side authentication
  - Restricted access through DNS/WAF

## Support & Maintenance

### Troubleshooting
- **Data not saving?** Check browser's localStorage settings
- **Design looks broken?** Clear browser cache and refresh
- **Navigation not smooth?** Ensure JavaScript is enabled

### Updating Miles
1. Open `admin.html`
2. Enter new values
3. Click "Update Data"
4. Changes appear instantly on the main site

## File Sizes (Estimated)
- `index.html`: ~6 KB
- `styles.css`: ~12 KB
- `script.js`: ~3 KB
- `admin.html`: ~5 KB
- **Total**: ~26 KB (very fast loading!)

## License
Personal project for charity event. Feel free to modify and use as needed.

---

**Created for**: Miles for Meals 2026
**Purpose**: Tracking charitable running miles for the local food bank
**Last Updated**: December 2025
