from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
import os
from utils.file_parser import QuizParser
from utils.validators import FileValidator
import tempfile

app = FastAPI(title="Quiz Parser API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = tempfile.mkdtemp()

@app.get("/")
def read_root():
    return {"message": "Quiz Parser API is running"}

@app.post("/api/parse-quiz")
async def parse_quiz(
    question_file: UploadFile = File(...),
    answer_file: UploadFile = File(...)
):
    """
    Parse quiz files and return structured quiz data
    """
    try:
        # Validate files
        is_valid_q, msg_q = FileValidator.validate_file(question_file)
        is_valid_a, msg_a = FileValidator.validate_file(answer_file)
        
        if not is_valid_q:
            raise HTTPException(status_code=400, detail=msg_q)
        if not is_valid_a:
            raise HTTPException(status_code=400, detail=msg_a)
        
        # Save files temporarily
        question_path = os.path.join(UPLOAD_DIR, f"question_{question_file.filename}")
        answer_path = os.path.join(UPLOAD_DIR, f"answer_{answer_file.filename}")
        
        # Save uploaded files
        with open(question_path, "wb") as buffer:
            shutil.copyfileobj(question_file.file, buffer)
        
        with open(answer_path, "wb") as buffer:
            shutil.copyfileobj(answer_file.file, buffer)
        
        # Parse files
        quiz_data = QuizParser.parse_quiz_files(question_path, answer_path)
        
        # Clean up
        os.remove(question_path)
        os.remove(answer_path)
        
        return JSONResponse(
            status_code=200,
            content=quiz_data
        )
    
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/api/submit-quiz")
async def submit_quiz(submission: dict):
    """
    Calculate quiz score
    """
    try:
        user_answers = submission.get("answers", {})
        correct_answers = submission.get("correctAnswers", {})
        
        score = 0
        total = len(correct_answers)
        
        for q_num, correct_ans in correct_answers.items():
            user_ans = user_answers.get(str(q_num))
            if user_ans == correct_ans:
                score += 1
        
        percentage = (score / total * 100) if total > 0 else 0
        
        return JSONResponse(
            status_code=200,
            content={
                "score": score,
                "total": total,
                "percentage": round(percentage, 2),
                "passed": percentage >= 50
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
