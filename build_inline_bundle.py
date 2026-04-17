#!/usr/bin/env python3
"""
Build js/inline.js by concatenating js/inline/partXXX.js in numeric order.
Usage:
  python3 build_inline_bundle.py
"""
import os, re
BASE=os.path.dirname(os.path.abspath(__file__))
INLINE_DIR=os.path.join(BASE,'js','inline')
OUT=os.path.join(BASE,'js','inline.js')

parts=[p for p in os.listdir(INLINE_DIR) if re.match(r'part\d+\.js$', p)]
parts=sorted(parts, key=lambda x:int(re.findall(r'\d+',x)[0]))

with open(OUT,'w',encoding='utf-8') as out:
    out.write('// Bundled from js/inline/partXXX.js (order preserved)\n')
    out.write('// NOTE: Keep index.html loading parts until you re-bundle safely.\n\n')
    for fn in parts:
        out.write(f"\n\n/* ===== {fn} ===== */\n")
        with open(os.path.join(INLINE_DIR,fn),'r',encoding='utf-8',errors='ignore') as fp:
            out.write(fp.read())

print('[OK] wrote', OUT)
""")
