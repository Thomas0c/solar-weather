const colors = {
  white: '#FFF',
  black: '#000',
  lightGrey: '#EEEEEE',
  lightOrange: '#F2C992',
  darkOrange: '#FEC272',
  lightBlueGrey: '#A5C9D6',
  darkBlueGrey: '#8093B6',
  lightMatteBlue: '#A6B6BC',
  darkMatteBlue: '#7C8FA0',
  lightBlue: '#94B4BD',
  darkBlue: '#5B828D',
  lightBeige: '#CEBA9F',
  darkBeige: '#A88F70',
  mattePurple: '#6B7AA7',
  darkPurple: '#565C71',
  lightSquash: '#7C718C',
  darkSquash: '#443E4E',
  darkGrey: '#757575',
  subtleGrey: '#EFEFEF',
  snowGrey: '#C1C7C9',
  snowWhite: '#DEE3E5',
};

const identifyColor = (color) => {
  if (color in colors) {
    return colors[color];
  }
  return null;
};

const identifyBackground = (condition, day) => {
  if (condition === 'clear-night') {
    return colors.darkBlueGrey;
  } else if (condition === 'clear-day') {
    return colors.darkOrange;
  } else if (condition === 'cloudy' || condition === 'partly-cloudy-day' || condition === 'partly-cloudy-night') {
    return day ? colors.lightMatteBlue : colors.darkMatteBlue;
  } else if (condition === 'rain') {
    return day ? colors.mattePurple : colors.darkPurple;
  } else if (condition === 'snow') {
    return colors.snowGrey;
  } else if (condition === 'thunderstorm') {
    return day ? colors.lightSquash : colors.darkSquash;
  } else if (condition === 'fog') {
    return day ? colors.lightBlue : colors.darkBlue;
  }
  return colors.lightBlueGrey;
};

const identifyFontColor = (condition) => {
  if (condition === 'snow') {
    return colors.darkGrey;
  }
  return colors.subtleGrey;
};

module.exports = {
  colors,
  identifyColor,
  identifyBackground,
  identifyFontColor,
};
