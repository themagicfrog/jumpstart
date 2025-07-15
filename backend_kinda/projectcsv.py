import re
import csv

def parse_game_idea(text):
    # Map possible user field names to canonical keys
    field_map = {
        "game name": "Game Name",
        "name of game": "Game Name",
        "name": "Game Name",
        "game genre": "Game Genre",
        "type of game": "Game Genre",
        "genre": "Game Genre",
        "type": "Game Genre",
        "game type": "Game Genre",
        "one-liner": "Description",
        "one liner": "Description",
        "description": "Description",
        "features": "Features",
        "gameplay": "Gameplay",
        "game engine": "Game Engine",
        "engine": "Game Engine",
        "experience": "Experience",
        "other notes": "Other Notes",
        "notes": "Other Notes"
    }

    # The canonical order of fields
    canonical_fields = [
        "Game Name", "Game Genre", "Description", "Features",
        "Gameplay", "Game Engine", "Experience", "Other Notes"
    ]
    fields = {k: "" for k in canonical_fields}
    fields["Features"] = []

    # Build regex for all possible field names
    field_names_regex = '|'.join(re.escape(k) for k in field_map.keys())
    # Match: field label, separator (':' or ' - '), then value (possibly multiline)
    pattern = re.compile(
        rf"^\s*({field_names_regex})\s*[:\-]\s*(.*?)(?=^\s*({field_names_regex})\s*[:\-]|^\s*-\s|^\s*$|\Z)",
        re.IGNORECASE | re.MULTILINE | re.DOTALL
    )

    # Find all field matches in order
    matches = list(pattern.finditer(text))
    for match in matches:
        label = match.group(1).strip().lower()
        value = match.group(2).strip()
        canonical = field_map[label]
        if canonical == "Features":
            # Take every non-empty line, strip leading dashes/bullets/whitespace
            features = []
            for line in value.splitlines():
                cleaned = re.sub(r"^\s*[-•*]?\s*", "", line)
                if cleaned:
                    features.append(cleaned)
            fields["Features"] = features
        else:
            fields[canonical] = value

    # Fallback for features if not found above
    if not fields["Features"]:
        features_match = re.search(r"Features\s*[:\-]\s*((?:- .*\n?)+)", text, re.IGNORECASE)
        if features_match:
            features_text = features_match.group(1)
            features = [line[2:].strip() for line in features_text.splitlines() if line.strip().startswith('-')]
            fields["Features"] = features

    row = [
        fields["Game Name"],
        fields["Game Genre"],
        fields["Description"],
        " | ".join(fields["Features"]),
        fields["Gameplay"],
        fields["Game Engine"],
        fields["Experience"],
        fields["Other Notes"]
    ]
    return row

# Example usage:
if __name__ == "__main__":
    with open("./project_set.txt", "r", newline='\r\n', encoding="utf-8") as txtfile:
        projects = txtfile.read().split("\r\n\r\n")
        with open("projects.csv", "a", newline='', encoding="utf-8") as csvfile:
            for proj in projects:
                projet = proj.split('\r\n')
                name = projet.pop()
                projet = '\r\n'.join(projet)
                
                row = parse_game_idea(projet)
                row.append(name)
                
                writer = csv.writer(csvfile)
                writer.writerow(row)