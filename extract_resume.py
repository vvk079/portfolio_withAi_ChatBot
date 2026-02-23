import pypdf
import os

pdf_path = r'c:\Users\Vivek\OneDrive\Desktop\test-portfolio\viveks_Resume.pdf'
output_path = r'c:\Users\Vivek\OneDrive\Desktop\test-portfolio\extracted_resume.txt'

try:
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
    else:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Successfully extracted text to {output_path}")
except Exception as e:
    print(f"Error: {e}")
