const _ = {
  debounce: (func) => {
    clearTimeout(debounce);

    const debounce = setTimeout(() => {
      func();
    }, 1000);
  },

  pipe: (...functions) => (args) => functions.reduce((arg, nextFn) => nextFn(arg), args),

  createRandomRGBColor: () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return { r, g, b };
  },

  isDarkColor: (RGBColors) => {
    if (!RGBColors) {
      return null;
    } else {
      const { r, g, b } = RGBColors;
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      const textColor = yiq < 150 ? "#fff" : "#000";

      return { r, g, b, textColor };
    }
  },

  changeHexToRgb: (hex) => {
    if (!hex) {
      return null;
    } else {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            hex,
          }
        : null;
    }
  },
  changeRgbToHex: (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return rgb && rgb.length === 4
      ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
      : "";
  },

  setCookie: (key, value, days) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);

    var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = key + '=' + cookie_value;
  },

  getCookie: (key) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + key + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  },

  deleteCookie: (key) => {
    document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  },

  //   createRandomHexColor: () => {
  //     const randomHexColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  //     return randomHexColor;
  //   },

  //   changeHexToRgb_1: (hex) => {
  //     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //     return result
  //       ? {
  //           r: parseInt(result[1], 16),
  //           g: parseInt(result[2], 16),
  //           b: parseInt(result[3], 16),
  //           hex: hex,
  //         }
  //       : {
  //           r: 100,
  //           g: 120,
  //           b: 20,
  //           hex,
  //         };
  //   },

  //   isDarkColor_1: (colors) => {
  //     const { r, g, b, hex } = colors;
  //     const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  //     return { isDark: yiq < 150, hex };
  //   },
};

export default _;

// #000 black
// #fff white
