# Record-run results

The human-readable archive of the official platform-matrix record runs.
Three files:

| File | What it is |
| --- | --- |
| [`RESULTS.md`](RESULTS.md) | The record: all tables (AWS + local matrix, the separate Azure record run), provenance, and the Notes/anomalies narrative. Every number is transcribed from the record JSONs — no other source. |
| [`EVIDENCE.md`](EVIDENCE.md) | The evidence appendix: every raw record-run output (JSONs, full run transcripts, the cell 2 crash diagnostics), merged into one browsable file. Each fenced block is the verbatim, unmodified content of the original output file, with byte lengths for integrity. |
| `README.md` | This file — the archive rules. |

## Archive rules

Evidence in `EVIDENCE.md` is copied verbatim from the output of the
published, unmodified `scripts/ci-test.sh` (plus, for failed rigs, the
launch transcripts and scripted diagnostics that are the only evidence a
suite never ran). Nothing is edited, truncated, or summarized. The cell 2
re-run JSON is confirmation evidence only — RESULTS.md tables are
transcribed from the first record-run JSON. The Azure record run is a
separate matrix (its own section in RESULTS.md; timings never merged with
the AWS + local tables — behavioral verdicts meet only in Table 0).

Machine-readable per-file originals are kept out of the repository, in
the gitignored `results/` working directory: exact copies of every file
embedded in `EVIDENCE.md` live in `results/record-raw/`, and the raw run
downloads live in `results/aws/`, `results/azure/`, and
`results/s3-final-backup/` (the snapshot taken before the S3 transport
bucket was deleted). Practice, familiarization, and ad-hoc runs never
enter this directory.
