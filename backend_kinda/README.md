# Jumpstart Backend (not really a backend)
Made by Rohan V-F

## Instructions

Make sure to start with a CSV file consisting of only the header line, like this. It MUST have the extra newline.
```csv
Game Name,Game Genre,Description,Features,Gameplay,Game Engine,Experience,Other Notes,Made By

```

### Step #1 - Pasting

So you take the text file named project_set.txt and fill it with new projects in this format:
```
<previous project>
\n
<entire project message>
name of creator
\n
<next project>
```

### Step #2 - Formatting

You may need to do some tweaking of the message's format to get things to run perfectly. If the name is in the same line as "GAME IDEA", then pull it down into its own line with `Game Name: <name>`.

Also make sure that there is only one line per entry, as in a `Gameplay:` line must not have multiple lines. If one does, just turn it into a single line.

Take a look at [past files](finished/project_set_7-15-25.txt) to see in more detail how to format.

### Step 3 - Finishing

Run these two commands.
```bash
py projectcsv.py # converts txt file to csv
node projects # converts csv to HTML divs and appends to projects.html
```

This code ADDS ONTO the existing documents, so make sure to start fresh every update with empty files! Also please move your files from each update into the `finished` folder and date them as has been done with the ones already there.

And everything should be done after that! Bask in the glory of your extremely large project list and auto-updated HTML file.