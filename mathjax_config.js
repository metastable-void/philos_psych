MathJax.Hub.Config({tex2jax:{inlineMath:[['\$','\$'],['\\(','\\)']],
processEscapes:true},
TeX: { extensions: ["https://anosatsuk124.github.io/philos_psych/xypic.js", "mhchem.js"],
Macros: {
      aar: '{\\ar@{-}[#1], 1}',
      gf: ['{\\genfrac{ }{ }{0px}{0}{ }{#1}}', 1],
      abs: ['\\lvert #1 \\rvert', 1]
      f: ['{\\displaystyle\\frac{#1}{#2}}', 2]
}
},
CommonHTML: {matchFontHeight:false}});

MathJax.Ajax.loadComplete("https://anosatsuk124.github.io/philos_psych/mathjax_config.js");
