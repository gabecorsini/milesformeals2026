# Miles for Meals 2026 - Project Documentation

## Overview
Miles for Meals 2026 is a single-page charitable running event website that tracks Missy Watson's running miles throughout 2026 and converts them into donations to the local food bank.

## Project Structure

```
miles-for-meals-2026/
├── index.html           # Main public website
├── admin.html           # Admin panel for updating miles data
├── styles.css           # Responsive styling for the entire site
├── script.js            # Data management and interactivity
├── data.json            # (Optional) Future API data storage
└── README.md            # This file
```

## Features

### 🌟 Main Website (index.html)
- **Header**: Prominent branding with gradient background
- **Navigation**: Sticky navigation bar for easy section access
- **About Section**: Event description and donation model explanation
  - $1 per training mile
  - $2 per race mile
- **Tracker Section**: Real-time statistics display
  - Total miles counter
  - Training miles counter
  - Race miles counter
  - Total donations raised (highlighted)
  - Progress bar toward 1,200 mile goal
- **Contact Section**: Multiple ways to get involved
  - Email contact
  - Venmo integration link
  - Social media links
- **Footer**: Additional resources and social links

### 🔧 Admin Panel (admin.html)
- Easy data entry form for updating miles
- Displays current data
- Validation and confirmation dialogs
- Success/error messaging
- Reset functionality (with confirmation)

### 💾 Data Management (script.js)
- **MilesTracker Class**: Manages all data operations
  - Stores data in browser's localStorage (no backend needed)
  - Calculates donations automatically
  - Updates display in real-time
- **Smooth Navigation**: Animated scrolling between sections
- **Persistent Storage**: Data persists across browser sessions

### 🎨 Responsive Design (styles.css)
- Mobile-first approach
- Fully responsive from 320px to 4K displays
- Smooth transitions and hover effects
- Accessible color contrast
- Running/charity themed color palette

## Color Palette
- **Primary Blue**: #2563eb - Main brand color
- **Charity Red**: #dc2626 - Accent for impact
- **Warm Orange**: #f59e0b - Accent for engagement
- **Success Green**: #10b981 - Progress indicator
- **Dark Background**: #0f172a - Depth
- **Light Background**: #f8fafc - Clean, readable

## How to Use

### For the Public (index.html)
1. Visit the website to see Missy's current progress
2. View the miles counter and donation total
3. Use contact buttons to reach out via email, Venmo, or social media
4. Check the progress bar to see how close to the 1,200 mile goal

### For Missy (admin.html)
1. Navigate to `admin.html`
2. Enter the current training miles and race miles
3. Enter any additional donations received
4. Click "Update Data"
5. The main website automatically reflects these changes

## Data Storage

The site uses **localStorage** for data persistence:
- No backend server required
- Data stored locally on the device
- Data persists across browser sessions
- Can be reset with confirmation

### Data Structure
```javascript
{
  trainingMiles: 0,      // Total training miles
  raceMiles: 0,          // Total race miles
  additionalDonations: 0, // Extra donations
  lastUpdated: "ISO timestamp"
}
```

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
