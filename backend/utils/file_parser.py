from docx import Document
from docx.shared import RGBColor
from typing import List, Dict, Tuple
import re

class QuizParser:
    """Parse quiz files and extract questions with answers"""
    
    @staticmethod
    def extract_text_with_colors(doc_path: str) -> List[Dict]:
        """
        Extract text and color information from Word document
        Returns list of paragraphs with their color info
        """
        doc = Document(doc_path)
        paragraphs_data = []
        
        for para in doc.paragraphs:
            if not para.text.strip():
                continue
                
            para_info = {
                "text": para.text,
                "runs": []
            }
            
            for run in para.runs:
                run_color = None
                if run.font.color and run.font.color.rgb:
                    rgb = run.font.color.rgb
                    run_color = {
                        "r": rgb[0],
                        "g": rgb[1],
                        "b": rgb[2],
                        "hex": f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
                    }
                
                para_info["runs"].append({
                    "text": run.text,
                    "color": run_color,
                    "is_red": QuizParser._is_red_color(run.font.color)
                })
            
            paragraphs_data.append(para_info)
        
        return paragraphs_data
    
    @staticmethod
    def _is_red_color(color) -> bool:
        """Check if color is red (for marking correct answers)"""
        if not color or not color.rgb:
            return False
        
        rgb = color.rgb
        r, g, b = rgb[0], rgb[1], rgb[2]
        
        # Red: R > 200, G < 100, B < 100
        return r > 200 and g < 100 and b < 100
    
    @staticmethod
    def parse_quiz_files(question_file: str, answer_file: str) -> Dict:
        """
        Parse question file and answer file, match them together
        Returns structured quiz data
        """
        # Extract data from both files
        question_data = QuizParser.extract_text_with_colors(question_file)
        answer_data = QuizParser.extract_text_with_colors(answer_file)
        
        # Parse questions
        questions = []
        i = 0
        
        while i < len(question_data):
            para = question_data[i]
            text = para["text"].strip()
            
            # Check if this is a question line (starts with digit and dot)
            if re.match(r'^\d+\.\s+', text):
                question_text = text
                options = {}
                i += 1
                
                # Collect answer options (A, B, C, D)
                while i < len(question_data):
                    opt_text = question_data[i]["text"].strip()
                    match = re.match(r'^([A-D])\)\s+(.+)$', opt_text)
                    
                    if match:
                        option_key = match.group(1)
                        option_value = match.group(2)
                        options[option_key] = option_value
                        i += 1
                    else:
                        break
                
                if options:
                    questions.append({
                        "number": len(questions) + 1,
                        "question": question_text,
                        "options": options
                    })
            else:
                i += 1
        
        # Extract correct answers from answer file
        correct_answers = {}
        question_counter = 1
        i = 0
        
        while i < len(answer_data):
            para = answer_data[i]
            text = para["text"].strip()
            
            if re.match(r'^\d+\.\s+', text):
                question_counter_current = question_counter
                i += 1
                
                # Look for red colored answer
                while i < len(answer_data):
                    opt_text = answer_data[i]["text"].strip()
                    match = re.match(r'^([A-D])\)\s+(.+)$', opt_text)
                    
                    if match:
                        option_key = match.group(1)
                        
                        # Check if any run in this paragraph is red
                        is_red = any(run["is_red"] for run in answer_data[i]["runs"])
                        
                        if is_red:
                            correct_answers[question_counter_current] = option_key
                        
                        i += 1
                    else:
                        break
                
                question_counter += 1
            else:
                i += 1
        
        # Combine questions with correct answers
        for q in questions:
            q_num = q["number"]
            q["correct_answer"] = correct_answers.get(q_num, None)
        
        return {
            "total_questions": len(questions),
            "questions": questions
        }
