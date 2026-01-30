import axios from 'axios';

// Mocked multiplier logic based on country code
const REGIONAL_SETTINGS = {
  'ES': { multiplier: 1.3, hourlyRate: 25 }, // Spain
  'IE': { multiplier: 1.4, hourlyRate: 45 }, // Ireland
  'CA': { multiplier: 1.4, hourlyRate: 45 }, // Canada
  'US': { multiplier: 1.5, hourlyRate: 45 }, // USA
  'EC': { multiplier: 0.65, hourlyRate: 16 }, // Ecuador (Baseline)
  'MX': { multiplier: 0.5, hourlyRate: 14 }, // Mexico
  'CO': { multiplier: 0.30, hourlyRate: 12 }, // Colombia
  // Default fallback
  'DEFAULT': { multiplier: 1.1, hourlyRate: 50 }
};

export async function detectUserLocation() {
  try {
    // Using ipapi.co (Free tier allows 1000 requests/day, suitable for dev/MVP)
    // Production recommendation: Use a paid service or Firebase Functions to avoid exposing rate limits
    const response = await axios.get('https://ipapi.co/json/');
    const countryCode = response.data.country_code;
    const countryName = response.data.country_name;
    
    const settings = REGIONAL_SETTINGS[countryCode] || REGIONAL_SETTINGS['DEFAULT'];

    return {
      countryCode,
      countryName,
      multiplier: settings.multiplier,
      hourlyRate: settings.hourlyRate
    };
  } catch (error) {
    console.error('Geolocation failed:', error);
    // Fallback
    return {
      countryCode: 'Unknown',
      countryName: 'Unknown',
      multiplier: 1.0,
      hourlyRate: 50
    };
  }
}
