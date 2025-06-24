# 🦜 PollyGlot Translator

**PollyGlot Translator** is a proof-of-concept web application that provides quick and accurate translations across multiple language via OpenAI’s GPT mode.

The app is designed to be mobile-friendly and functions as a simple, streamlined language assistant.

## Working Example 
https://ai-translator-app.netlify.app/

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Build Tool:** Vite
- **Backend:** Netlify Functions (Node.js)
- **APIs Used:** [OpenAI API](https://platform.openai.com/) – for generating translations
- **Hosting:** Netlify

---

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/pollyglot-translator.git
cd pollyglot-translator
npm install
```

## Project Structure
```
/
├── public/              
│   └── images/            # App icons and theme images
├── src/                  
│   ├── main.js            # Frontend app logic
│   └── style.css          # App styling
├── netlify/functions/     
│   └── translate.js       # Serverless translation handler
├── .env                   # API key (excluded from repo)
├── netlify.toml           # Netlify config

```

## 📄 License

This project is licensed under the [MIT License](LICENSE).
