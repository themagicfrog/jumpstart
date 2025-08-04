# Games Gallery Setup Guide

## 🔑 **Required Configuration**

Before using the games gallery, you need to update the Airtable credentials in `games.html`:

1. **Get your Airtable credentials:**
   - API Key: Go to [Airtable Account](https://airtable.com/account) → API → Generate API Key
   - Base ID: Found in your Airtable URL: `https://airtable.com/appXXXXXXXXXXXXXX`
   - Table Name: The name of your table in Airtable

2. **Update games.html:**
   Replace the placeholder values in the JavaScript section:
   ```javascript
   const AIRTABLE_API_KEY = 'your_actual_api_key_here';
   const AIRTABLE_BASE_ID = 'your_actual_base_id_here';
   const AIRTABLE_TABLE_NAME = 'your_table_name_here';
   ```

## 📋 **Airtable Table Structure**

Your Airtable table should have these fields:
- Game Name
- Cover Image
- Name (developer name)
- Game Description
- One-liner
- Hours
- First Game? (checkbox)
- Thoughts
- Itch.io link
- Github repo
- Gameplay video
- Game thread
- Country
- Additional Images
- Slack Display Name
- Age
- Sound (for audio files)

## ⚠️ **Security Note**

Never commit your actual API keys to version control. The `.env` file and any files with real credentials should be in your `.gitignore`.

## 🚀 **Features**

- Auto-scrolling image carousels on hover
- Sound playback on hover
- Responsive design
- Dynamic game count
- Expandable descriptions and thoughts 