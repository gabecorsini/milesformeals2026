# Miles for Meals 2026 Site
This is a simple single page site for a charity event called "Miles for Meals 2026". The event will follow my mother, Missy Watson, as she runs throughout 2026 and donates money to her local food bank based on the number of miles she runs throughout the year. She intends to donate $1 dollar for every training mile she runs, and $2 dollars for every race mile. Last year, based on this model, she would have donated roughly $1200 to her local food bank. 

## Site details
A simple single page site with the following sections:
- Header with event title and date
- About section describing the event and its purpose
- Miles Tracker section displaying the total miles run and total donations
- Contact section to reach out for more information or to make additional donations (thinking about a simple venmo integration here that either goes to Missy or directly to the food bank)
- Footer with social media links and additional resources
- Responsive design for mobile and desktop viewing

## Technologies
- Simple Web technologies for a fast, responsive and movile-friendly site.
- Garmin API integration to automatically pull in Missy's running data and update the miles tracker in real-time. Should be able to pull in and differentiate between training miles and race miles. 
- Simple form handling contect section or some sort of social media integration to reach out to Missy directly.
- Cheap and easy to maintain hosting solution, like Github Pages. 

## Hurdles
- Garmin API integration: Need to research how to pull in data from Garmin and how to differentiate between training and race miles. As of now the official Garmin API requires registration and approval, and looks like it often denies registration for personal projects. May need to look into unofficial APIs or web scraping solutions if official API access is denied, or some simple form of manual entry. 

## Other Thoughts
- My mother is not very tech-savvy and should not have to do some sort of complicated data entry to keep her site up to date. 
- The miles tracker and donation total should be front and center as that is the purpose of the site. 
- The site should be simple and thematic to running and charity, with a focus on clarity. I don't want more than a single page. 