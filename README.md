# ⚡ AutoRepo

AutoRepo is an AI-powered command execution engine that turns natural language into working folder structures and code using shell commands — all orchestrated via GPT-4 in a step-by-step reasoning loop.

---

## 🚀 What It Does

- Accepts user queries like:  
  _"Create a folder `weather` and generate a React + Vite weather app that shows data for Paris, New York, and Tokyo."_
- Thinks step-by-step using a structured loop:  
  `THINK → ACTION → OBSERVE → OUTPUT`
- Executes real **shell commands** (e.g., `mkdir`, `touch`, etc.)
- Generates code and file structure inside specified folders

---

## 🧠 Workflow

The system goes through 5 phases:

1. **START** – User gives a natural language query
2. **THINK** – GPT thinks step-by-step about how to approach the problem
3. **ACTION** – GPT calls a tool like `executeCommand`
4. **OBSERVE** – Captures output of the command
5. **OUTPUT** – Provides the final summary or completion message

All communication is in **strict JSON format** between steps.

---

## 🔧 Available Tool

| Tool | Description |
|------|-------------|
| `executeCommand(command)` | Executes any shell command (like `mkdir`, `touch`, `echo`, etc.) |

---

## 🛠 Tech Stack

- Node.js
- OpenAI (GPT-4)
- `child_process` for command execution
- `dotenv` for environment variable management

---

## 📦 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/autorepo.git
cd autorepo
````

2. **Install Dependencies**

```bash
npm install
```

3. **Add Your OpenAI API Key**

Create a `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run the App**

```bash
node index.js
```

> You can edit the `user_query` inside `index.js` to try different tasks.

---

## 💡 Example Prompt

```js
const user_query = 'Create a folder called portfolio and add HTML, CSS, and JavaScript files for a landing page. Also create a README with basic instructions.'
```

This would result in:

* Folder `portfolio` being created
* Files like `index.html`, `style.css`, `script.js` generated
* A `README.md` created

---
