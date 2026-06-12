# Quiz Application - Setup Instructions

## 🚀 Quick Start Guide

### Step 1: Backend Setup (Python)

```bash
# Navigate to backend directory
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

# Run the server
uvicorn app:app --reload --port 8000
```

**Backend will run at:** `http://localhost:8000`

### Step 2: Frontend Setup (Node.js)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

**Frontend will run at:** `http://localhost:5173`

---

## 📝 How to Prepare Quiz Files

### File 1: Questions (.docx)

Format your questions like this:

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

### File 2: Answers (.docx)

Same format as above, but highlight the correct answers in RED:

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

---

## 🎮 Using the Application

1. Open `http://localhost:5173` in your browser
2. Click on the upload area or drag & drop both files
3. Click **"🚀 Start Quiz"** to begin
4. Answer all questions by clicking on options
5. Submit your answers to see results

---

## ✨ Features

✅ **Real-time Feedback** - See if your answer is correct instantly
✅ **Visual Animations** - Smooth transitions and effects
✅ **Progress Tracking** - See how many questions you've answered
✅ **Score Calculation** - Get detailed results with percentage
✅ **Confetti Effect** - Celebration when you pass!
✅ **Responsive Design** - Works on mobile and desktop

---

## 🔧 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
uvicorn app:app --reload --port 8001
```

**File parsing errors:**
- Make sure files are in `.docx` format
- Correct answers MUST be in RED color (not bold/italic)
- Follow the Q/A format strictly

### Frontend Issues

**Port 5173 in use:**
```bash
npm run dev -- --port 5174
```

**API connection errors:**
- Check if backend is running at `http://localhost:8000`
- Make sure CORS is enabled in `backend/app.py`

---

## 📂 Project Structure

```
quiz-app/
├── backend/
│   ├── app.py                    # FastAPI application
│   ├── requirements.txt          # Python dependencies
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── file_parser.py       # Parse quiz files
│   │   └── validators.py        # Validate files
│   └── uploads/                 # Temporary files
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Results.jsx
│   │   └── components/
│   │       ├── FileUpload.jsx
│   │       ├── QuestionCard.jsx
│   │       ├── AnswerOption.jsx
│   │       └── Confetti.jsx
│   └── public/
├── .gitignore
├── README.md
└── SETUP.md
```

---

## 🌐 API Endpoints

### POST `/api/parse-quiz`

**Request:**
```
Content-Type: multipart/form-data
question_file: (file)
answer_file: (file)
```

**Response:**
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

**Request:**
```json
{
  "answers": {
    "1": "B",
    "2": "C"
  },
  "correctAnswers": {
    "1": "B",
    "2": "C"
  }
}
```

**Response:**
```json
{
  "score": 2,
  "total": 2,
  "percentage": 100,
  "passed": true
}
```

---

## 💡 Tips

- Keep question and answer files identical in structure
- Use clear, readable fonts
- Red color for correct answers should be RGB(255, 0, 0) or close
- Test with a small quiz first before using large files

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check the terminal for backend errors
3. Make sure both servers are running
4. Try refreshing the page

---

**Happy Quizzing! 🎓**
