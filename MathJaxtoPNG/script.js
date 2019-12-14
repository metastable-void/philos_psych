const SAVED_INPUT = 'saved_input';
const SAVED_FONT = 'saved_font';
const SAVED_FONT_SIZE = 'saved_font_size';
const SAVED_BACKGROUND_COLOR = 'saved_background_color';
const SAVED_TEXT_COLOR = 'saved_text_color';

window.onload = function() {
  ga('create', 'UA-465060-12', 'auto');
  const inputArea = document.getElementById('input_area');
  const outputArea = document.getElementById('output_area');
  let lastUpdatedTime = new Date().getTime();
  let lastSavedTime = new Date().getTime();
  const fontRadios = document.getElementsByName('font_radio');
  const fontSizeRange = document.getElementById('font_size_range');
  const bgColorInput = document.getElementById('bg_color_input');
  const textColorInput = document.getElementById('text_color_input');
 
  const savedInput = localStorage.getItem(SAVED_INPUT);
  let str;
  if (savedInput === null || savedInput === '') {
    str = inputArea.getAttribute('placeholder');
  } else {
    str = savedInput;
    inputArea.value = str;
  }
  outputArea.innerHTML = str.replace(/\r?\n/g, '<br>');

  
  const savedFont = localStorage.getItem(SAVED_FONT);
  if (savedFont !== null && savedFont !== '') {
    outputArea.style.fontFamily = savedFont;
    if (savedFont === 'serif') {
      fontRadios[1].checked = true;
    }
  }

  const savedFontSize = localStorage.getItem(SAVED_FONT_SIZE);
  if (savedFontSize !== null && savedFontSize !== '') {
    outputArea.style.fontSize = (2 ** savedFontSize).toString() + 'rem';
    fontSizeRange.value = savedFontSize;
  }

  const savedBGColor = localStorage.getItem(SAVED_BACKGROUND_COLOR);
  if (savedBGColor !== null && savedBGColor !== '') {
    outputArea.style.backgroundColor = savedBGColor;
    bgColorInput.value = savedBGColor;
  }

  const savedTextColor = localStorage.getItem(SAVED_TEXT_COLOR);
  if (savedTextColor !== null && savedTextColor !== '') {
    outputArea.style.color = savedTextColor;
    textColorInput.value = savedTextColor;
  }

  // eslint-disable-next-line new-cap
  MathJax.Hub.Queue(['Typeset', MathJax.Hub]);

  inputArea.addEventListener('input', function() {
    setTimeout(() => {
      if (lastUpdatedTime + 500 < new Date().getTime()) {
        if (inputArea.value == '') {
          const str = inputArea.getAttribute('placeholder');
          outputArea.innerHTML = str.replace(/\r?\n/g, '<br>');
        } else {
          const str = inputArea.value;
          outputArea.innerHTML = str.replace(/\r?\n/g, '<br>');
        }
        // eslint-disable-next-line new-cap
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        lastUpdatedTime = new Date().getTime();
      }
    }, 550);
    setTimeout(() => {
      if (lastSavedTime + 5000 < new Date().getTime()) {
        localStorage.setItem(SAVED_INPUT, inputArea.value);
        lastSavedTime = new Date().getTime();
        console.log('input saved.');
      }
    }, 5500);
  });

  const pngButton = document.getElementById('download_png_button');
  const link = document.getElementById('hiddenLink');
  pngButton.addEventListener('click', () => {
    changeCSS();
    html2canvas(outputArea).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      link.href = dataURL;
      link.click();
      getbackCSS();
    });
    ga('send', 'event', 'image', 'downloaded');
  });

  fontRadios[0].addEventListener('change', () => {
    outputArea.style.fontFamily = 'sans-serif';
    localStorage.setItem(SAVED_FONT, 'sans-serif');
    ga('send', 'event', 'options', 'font', 'sans-serif');
  });
  fontRadios[1].addEventListener('change', () => {
    outputArea.style.fontFamily = 'serif';
    localStorage.setItem(SAVED_FONT, 'serif');
    ga('send', 'event', 'options', 'font', 'serif');
  });

  bgColorInput.addEventListener('input', () => {
    outputArea.style.backgroundColor = bgColorInput.value;
    localStorage.setItem(SAVED_BACKGROUND_COLOR, bgColorInput.value);
  });
  const bgColorResetButton = document.getElementById('bg_color_reset_button');
  bgColorResetButton.addEventListener('click', () => {
    outputArea.style.backgroundColor = '';
    localStorage.removeItem(SAVED_BACKGROUND_COLOR);
    bgColorInput.value = '#FFFFFF';
    ga('send', 'event', 'options', 'bgcolor', 'reset');
  });

  textColorInput.addEventListener('input', () => {
    outputArea.style.color = textColorInput.value;
    localStorage.setItem(SAVED_TEXT_COLOR, textColorInput.value);
  });
  const textColorResetButton = document.getElementById(
      'text_color_reset_button'
  );
  textColorResetButton.addEventListener('click', () => {
    outputArea.style.color = '';
    localStorage.removeItem(SAVED_TEXT_COLOR);
    textColorInput.value = '#000022';
    ga('send', 'event', 'options', 'textcolor', 'reset');
  });

  fontSizeRange.addEventListener('input', () => {
    outputArea.style.fontSize = (2 ** fontSizeRange.value).toString() + 'rem';
    localStorage.setItem(SAVED_FONT_SIZE, fontSizeRange.value);
  });
  const fontSizeResetButton = document.getElementById('font_size_reset_button');
  fontSizeResetButton.addEventListener('click', () => {
    fontSizeRange.value = 0;
    outputArea.style.fontSize = '1rem';
    localStorage.removeItem(SAVED_FONT_SIZE);
    ga('send', 'event', 'options', 'fontsize', 'reset');
  });
  /**
   * 描画テストで使うための関数です。
   */
  // function canvasTest() {
  //   // only for debug
  //   changeCSS();
  //   html2canvas(outputArea).then((canvas) => {
  //     canvasTestDiv = document.getElementById('canvas_test_div');
  //     canvasTestDiv.innerHTML = '';
  //     canvasTestDiv.appendChild(canvas);
  //     const dataURL = canvas.toDataURL('image/png');
  //     const img = document.createElement('img');
  //     img.setAttribute('src', dataURL);
  //     canvasTestDiv.appendChild(img);
  //     getbackCSS();
  //   });
  // }

  let bigElements2;
  let bigElements3;
  let bigElements4;
  let bigElementsAms;
  /**
   * 画像を保存する瞬間だけStyleを書き換えます
   */
  function changeCSS() {
    const ua = window.navigator.userAgent.toLowerCase();
    // Safariでない場合だけ処理
    if (
      !(
        ua.indexOf('safari') !== -1 &&
        ua.indexOf('chrome') === -1 &&
        ua.indexOf('edge') === -1
      )
    ) {
      bigElements2 = Array.from(
          document.getElementsByClassName('MJXc-TeX-size2-R')
      );
      bigElements3 = Array.from(
          document.getElementsByClassName('MJXc-TeX-size3-R')
      );
      bigElements4 = Array.from(
          document.getElementsByClassName('MJXc-TeX-size4-R')
      );
      bigElementsAms = Array.from(
          document.getElementsByClassName('MJXc-TeX-ams-R')
      );
      bigElements2.forEach((element) => {
        element.style.position = 'relative';
        element.style.top = '-0.45em';
      });
      bigElements3.forEach((element) => {
        element.style.position = 'relative';
        element.style.top = '-0.55em';
      });
      bigElements4.forEach((element) => {
        element.style.position = 'relative';
        element.style.top = '-0.85em';
      });
      bigElementsAms.forEach((element) => {
        element.style.position = 'relative';
        element.style.top = '-0.08em';
      });
    }
    outputArea.style.borderRadius = '0px';
    outputArea.style.boxShadow = 'inset 0px 0px 0px 0px black';
  }
  /**
   *  画像を保存し終わったら、Styleをもとに戻します。
   */
  function getbackCSS() {
    bigElements2
        .concat(bigElements3)
        .concat(bigElements4)
        .concat(bigElementsAms)
        .forEach((element) => {
          element.style.position = '';
          element.style.top = '';
        });
    outputArea.style.borderRadius = '';
    outputArea.style.boxShadow = '';
  }
};
