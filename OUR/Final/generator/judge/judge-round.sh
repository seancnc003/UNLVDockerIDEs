#!/bin/zsh
# usage: judge-round.sh <round-number>  — builds poster, renders, runs Codex judge with prior scoresheet
set -e
R=$1
S=/private/tmp/claude-501/-Users-seancuenco-Documents-UNLVDockerIDEs/f8a14316-390b-4330-adf6-6a268c769f01/scratchpad
G=/Users/seancuenco/Documents/UNLVDockerIDEs/OUR/Final/generator
J=$S/judge/r$R; mkdir -p "$J"; cd "$J"
NODE_PATH=$S/work/node_modules node "$G/poster-virtual.js" "$J/poster.pptx" >/dev/null
python3 -I "$G/finish-virtual.py" "$J/poster.pptx" >/dev/null
zip -dq poster.pptx '*/' 2>/dev/null || true
soffice --headless --convert-to pdf poster.pptx >/dev/null 2>&1
pdftoppm -jpeg -r 36 poster.pdf full && pdftoppm -jpeg -r 72 poster.pdf hi
"$S/venv/bin/python" -I -c "
from PIL import Image
im=Image.open('hi-1.jpg'); w,h=im.size
im.crop((0,0,w*38//100,h)).save('left-column.jpg',quality=88)
im.crop((w*32//100,0,w*69//100,h)).save('middle-column.jpg',quality=88)
im.crop((w*66//100,0,w,h)).save('right-column.jpg',quality=88)
im.crop((0,0,w,h*22//100)).save('header.jpg',quality=88)"
SK=/Users/seancuenco/.claude/skills/synced/0be54580-cb7b-4310-9891-66975354c4e1_dad3d55c-5579-49b1-bb42-c7d65285a1c6/pptx
"$S/venv/bin/python" "$SK/scripts/slide_text.py" poster.pptx > poster-text.md
"$S/venv/bin/python" "$SK/scripts/office/validate.py" poster.pptx | tail -1
PREV=$S/judge/codex-judge-report.md; [ $R -gt 2 ] && PREV=$S/judge/r$((R-1))/codex-judge-report.md
cp "$PREV" previous-scoresheet.md
{ cat "$S/judge/judge-brief.md"; cat <<BRIEF

ADDITIONAL CONTEXT FOR THIS ROUND (round $R of an iterative revision):
- This is a REVISED poster. Your previous scoresheet is in previous-scoresheet.md in the current directory; read it first and judge whether each of its concerns was addressed, partially addressed, or ignored.
- Fixed constraints the student cannot change, so do not deduct for them: the TITLE and author line are locked because the abstract was already accepted under that title; only four machines were tested and no student study exists yet (only honest wording about this is possible, not new data); the technical detail about the cloud test machines and the exact test procedure is included deliberately because the student expects technical judges to probe it; the architecture diagram (Figure 1) stays.
- Re-score every criterion 1-5 and give a letter grade. Then end your report with exactly one line: "VERDICT: SATISFIED" if every criterion scores 4 or higher and the overall grade is B+ or better, otherwise "VERDICT: NOT SATISFIED". If not satisfied, make section 4 the specific remaining changes, ranked, with replacement wording.
BRIEF
[ -n "$EXTRA" ] && cat "$EXTRA"; } > brief-r$R.md
codex exec --skip-git-repo-check -s read-only -C "$J" -i full-1.jpg -i header.jpg -i left-column.jpg -i middle-column.jpg -i right-column.jpg -o "$J/codex-judge-report.md" - < brief-r$R.md > codex-run.log 2>&1
echo "round $R done: $(grep -o 'VERDICT: .*' "$J/codex-judge-report.md" | tail -1)"
