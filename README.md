# Album Selector

A sleek, minimal album selector web app for browsing music by genre. Built for phone screens. Albums are loaded dynamically from txt files.

## Features

- **International**: Browse international albums
- **Turkey**: Turkish music collection
- **Jazz**: Jazz albums
- **Random Album**: Get a random album from any genre
- **Dynamic Loading**: Updates automatically when you edit txt files

## Colors

- Primary: #d18271 (Coral)
- Secondary: #eac089 (Beige)
- Dark: #2a2b30 (Charcoal)
- Background: Off-white (#f8f7f5)

## Managing Albums

Edit the txt files in the `public/` folder:

- `public/int list.txt` - International albums
- `public/tr list.txt` - Turkish albums
- `public/jazz list.txt` - Jazz albums

Format: `Artist Name - Album Title` (one per line)

## Local Development

```bash
npx http-server -p 3000
```

Then visit `http://localhost:3000`

## Deployment

Deploy to Vercel:

```bash
vercel
```

Vercel will automatically serve the txt files from the public folder.

## Project Structure

```
.
├── index.html              # Main HTML
├── style.css               # Styling
├── script.js               # Functionality & dynamic loading
├── package.json
├── vercel.json
├── .gitignore
└── public/
    ├── int list.txt        # International albums
    ├── tr list.txt         # Turkish albums
    └── jazz list.txt       # Jazz albums
```
