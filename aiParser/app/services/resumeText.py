import fitz  # PyMuPDF
import tempfile

async def get_resume_text(file):
    # Save uploaded file temporarily
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    # Extract text + links
    text = ""
    links = []
    doc = fitz.open(tmp_path)
    for page in doc:
        text += page.get_text("text") + "\n"

        # Extract hyperlinks from annotations
        for link in page.get_links():
            if "uri" in link and link["uri"]:
                links.append(link["uri"])

    doc.close()
    file.file.close()

    # Return both text and links
    return {
        "text": text.strip(),
        "links": list(set(links))  # remove duplicates
    }
