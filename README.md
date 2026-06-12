# 🎯 Quiz Master - Interactive Quiz Application

A modern, interactive quiz application with real-time feedback. Upload quiz files, answer questions, and get instant results!

## ✨ Features

- 📁 **Drag & Drop File Upload** - Upload question and answer files (.docx format)
- 🎨 **Modern UI** - Glassmorphism design with Dark Mode
- ⚡ **Real-time Feedback** - Instant visual feedback (Green/Red animations)
- 📊 **Score Calculation** - Automatic scoring and detailed results
- 🎉 **Confetti Effect** - Celebration animation for high scores
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎬 **Smooth Animations** - Framer Motion for elegant transitions

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **python-docx** - Parse Word documents
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client

## 📂 Project Structure

```
quiz-app/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── file_parser.py     # Quiz file parsing logic
│   │   └── validators.py      # File validation
│   └── uploads/               # Temporary file storage
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Upload page
│   │   │   ├── Quiz.jsx       # Quiz interface
│   │   │   └── Results.jsx    # Results page
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── AnswerOption.jsx
│   │   │   └── Confetti.jsx
│   │   ├── hooks/
│   │   │   └── useQuiz.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── public/
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app:app --reload --port 8000
```

Backend will run at: **http://localhost:8000**

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: **http://localhost:5173**

## 📝 How to Use

### Prepare Your Quiz Files

**Question File (question.docx):**
```
1. What is the capital of Vietnam?
A) Ho Chi Minh City
B) Hanoi
C) Da Nang
D) Can Tho

2. What is the capital of France?
A) Lyon
B) Marseille
C) Paris
D) Nice
```

**Answer File (answer.docx):** (Same as above, but correct answers highlighted in RED)
```
1. What is the capital of Vietnam?
A) Ho Chi Minh City
B) Hanoi [RED TEXT]
C) Da Nang
D) Can Tho

2. What is the capital of France?
A) Lyon
B) Marseille
C) Paris [RED TEXT]
D) Nice
```

### Quiz Flow

1. Open http://localhost:5173
2. Upload both files (Question + Answer)
3. System parses files and displays questions
4. Click to select answer → Instant visual feedback
5. Submit quiz → View detailed results

## 🎨 UI/UX Highlights

- **Glassmorphism Design** - Modern frosted glass effect
- **Dark Mode** - Eye-friendly dark theme
- **Smooth Animations** - Framer Motion for all interactions
- **Color Feedback**:
  - 🟢 **Green** - Correct answer
  - 🔴 **Red** - Incorrect answer
  - 🟦 **Blue** - Selected option
- **Interactive Elements** - Hover effects, scale animations
- **Progress Tracking** - Question counter and progress bar

## 🔑 Key Algorithms

### File Parsing Logic

The backend extracts questions and identifies correct answers by:
1. Reading `.docx` files using `python-docx`
2. Detecting red-colored text (RGB: R > 200, G < 100, B < 100)
3. Matching questions with correct answers
4. Returning structured JSON data

### Answer Validation

```python
def is_red_color(color) -> bool:
    rgb = color.rgb
    r, g, b = rgb[0], rgb[1], rgb[2]
    return r > 200 and g < 100 and b < 100
```

## 📊 API Endpoints

### POST `/api/parse-quiz`
Parse quiz files and extract questions
```json
{
  "total_questions": 2,
  "questions": [
    {
      "number": 1,
      "question": "What is the capital of Vietnam?",
      "options": {
        "A": "Ho Chi Minh City",
        "B": "Hanoi",
        "C": "Da Nang",
        "D": "Can Tho"
      },
      "correct_answer": "B"
    }
  ]
}
```

### POST `/api/submit-quiz`
Calculate quiz score
```json
{
  "score": 2,
  "total": 2,
  "percentage": 100,
  "passed": true
}
```

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
uvicorn app:app --reload --port 8001
```

**File parsing errors:**
- Ensure files are `.docx` format
- Correct answers must be in RED color (not just bold/italic)
- Follow the Q/A format strictly

### Frontend Issues

**Port 5173 in use:**
```bash
npm run dev -- --port 5174
```

**API connection errors:**
- Check if backend is running on `http://localhost:8000`
- Verify CORS settings in `backend/app.py`

## 🚀 Deployment

### Backend (Python Anywhere / Heroku)
```bash
gunicorn app:app
```

### Frontend (Vercel / Netlify)
```bash
npm run build
```

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created with ❤️ for EdTech lovers

---

**Questions or Suggestions?** Feel free to open an issue! 🙌
