# Record-run results

The human-readable archive of the official platform-matrix record runs.
Three files:

| File | What it is |
| --- | --- |
| [`RESULTS.md`](RESULTS.md) | The record: the four-cell platform-matrix tables (cells 1–2 AWS, cell 3 Azure, cell 4 local), provenance, and the Notes/anomalies narrative. Every number is transcribed from the record JSONs — no other source. |
| [`EVIDENCE.md`](EVIDENCE.md) | The evidence appendix: every raw record-run output (JSONs, full run transcripts, the cell 2 crash diagnostics), merged into one browsable file. Each fenced block is the verbatim, unmodified content of the original output file, with byte lengths for integrity. |
| `README.md` | This file — the archive rules. |

## Archive rules

Evidence in `EVIDENCE.md` is copied verbatim from the output of the
published, unmodified `scripts/ci-test.sh` (plus, for failed rigs, the
launch transcripts and scripted diagnostics that are the only evidence a
suite never ran). Nothing is edited, truncated, or summarized. The cell 2
re-run JSON is confirmation evidence only — RESULTS.md tables are
transcribed from the first record-run JSON. Cell 3 is the Azure Windows
11 record run (evidence files carry its `azure-cellA3-` label); its
timings carry the cross-cloud caveat stated in RESULTS.md's intro and
enter no ratio.

Machine-readable per-file originals are kept out of the repository, in
the gitignored `results/` working directory: exact copies of every file
embedded in `EVIDENCE.md` live in `results/record-raw/`, and the raw run
downloads live in `results/aws/`, `results/azure/`, and
`results/s3-final-backup/` (the snapshot taken before the S3 transport
bucket was deleted). Practice, familiarization, and ad-hoc runs never
enter this directory.
