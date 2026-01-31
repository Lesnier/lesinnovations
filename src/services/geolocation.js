import axios from 'axios';

// REGIONAL SETTINGS are now handled by the Backend (Laravel + Database)
// Single Source of Truth: 'regional_settings' table in database.

export async function detectUserLocation() {
  try {
    // Using ipapi.co (Free tier allows 1000 requests/day, suitable for dev/MVP)
    const response = await axios.get('https://ipapi.co/json/');
    const countryCode = response.data.country_code;
    const countryName = response.data.country_name;
    
    // We only return location data. 
    // The Backend will look up the correct hourlyRate and multiplier.
    return {
      countryCode,
      countryName
    };
  } catch (error) {
    console.error('Geolocation failed:', error);
    // Fallback
    return {
      countryCode: 'DEFAULT',
      countryName: 'Unknown'
    };
  }
}
