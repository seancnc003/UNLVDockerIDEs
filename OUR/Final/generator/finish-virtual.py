# Post-process: give the pptxgenjs poster the OUR template's gradient slide background (pptxgenjs cannot write gradients).
# Usage: python3 finish-virtual.py poster.pptx
import sys, zipfile, shutil, os, re
src = sys.argv[1]
BG = ('<p:bg><p:bgPr><a:gradFill><a:gsLst>'
      '<a:gs pos="22000"><a:srgbClr val="666666"/></a:gs>'
      '<a:gs pos="18000"><a:srgbClr val="B10202"><a:alpha val="70000"/></a:srgbClr></a:gs>'
      '<a:gs pos="100000"><a:srgbClr val="666666"/></a:gs>'
      '<a:gs pos="0"><a:srgbClr val="C00000"><a:alpha val="70000"/></a:srgbClr></a:gs>'
      '</a:gsLst><a:lin ang="5400000" scaled="1"/></a:gradFill><a:effectLst/></p:bgPr></p:bg>')
tmp = src + ".tmp"
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "ppt/slides/slide1.xml":
            s = data.decode("utf-8")
            s = re.sub(r"<p:bg>.*?</p:bg>", "", s, flags=re.S)
            s, n = re.subn(r"(<p:cSld[^>]*>)", r"\1" + BG, s, count=1)
            assert n == 1, "cSld not found"
            data = s.encode("utf-8")
        zout.writestr(item, data)
shutil.move(tmp, src)
print("background injected into", src)
