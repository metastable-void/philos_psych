MathJax.Hub.Config({tex2jax:{inlineMath:[['\$','\$'],['\\(','\\)']],
processEscapes:true},
TeX: { extensions: ["https://anosatsuk124.github.io/philos_psych/xypic.js", "mhchem.js"],
Macros: {
      RR: '{\\bf R}',
      sinc: '\\mathop{\\rm sinc}',
      abs: ['\\lvert #1 \\rvert', 1]
}
},
CommonHTML: {matchFontHeight:false}});

MathJax.Ajax.loadComplete("https://anosatsuk124.github.io/philos_psych/mathjax_config.js");
