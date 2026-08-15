"""Extract resume text from a PDF into the chatbot's knowledge base.

The assistant answers from backend/extracted_resume.txt, not from the PDF, so
rerun this whenever the resume changes or it will answer from a stale copy.

Usage:
    python extract_resume.py [pdf_path] [output_path]

Defaults to frontend/public/viveks_Resume.pdf -> backend/extracted_resume.txt.

Requires pypdf (`pip install pypdf`). Note that raw PDF extraction often mangles
bullets and splits sentences mid-line; skim the output before shipping it.
"""

import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    sys.exit("pypdf is not installed. Run: pip install pypdf")

ROOT = Path(__file__).resolve().parent
DEFAULT_PDF = ROOT / "frontend" / "public" / "viveks_Resume.pdf"
DEFAULT_OUT = ROOT / "backend" / "extracted_resume.txt"


def main() -> int:
    pdf_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PDF
    out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUT

    if not pdf_path.is_file():
        print(f"PDF not found: {pdf_path}")
        return 1

    reader = pypdf.PdfReader(str(pdf_path))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)

    if not text.strip():
        print(f"No extractable text in {pdf_path} (is it a scanned image?)")
        return 1

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(text, encoding="utf-8")

    print(f"Extracted {len(text)} characters from {pdf_path} -> {out_path}")
    print("Review the output — PDF extraction can mangle bullets and line breaks.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
