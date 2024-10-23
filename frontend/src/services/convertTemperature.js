export const convertTemperature = (kelvin, unit = 'celsius') => {
    if (!kelvin) return '--';
  
    switch (unit?.toLowerCase()) {
      case 'celsius':
        return (kelvin - 273.15).toFixed(1);
      case 'fahrenheit':
        return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
      case 'kelvin':
        return kelvin.toFixed(1);
      default:
        return (kelvin - 273.15).toFixed(1);
    }
  };
  
  export const getTemperatureUnit = (unit) => {
    switch (unit?.toLowerCase()) {
      case 'celsius':
        return '°C';
      case 'fahrenheit':
        return '°F';
      case 'kelvin':
        return 'K';
      default:
        return '°C';
    }
  };