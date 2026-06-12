from fastapi import UploadFile
import os
from typing import Tuple

ALLOWED_EXTENSIONS = {'.docx', '.pdf', '.txt'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

class FileValidator:
    @staticmethod
    def validate_file(file: UploadFile) -> Tuple[bool, str]:
        """Validate uploaded file"""
        if not file:
            return False, "No file provided"
        
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in ALLOWED_EXTENSIONS:
            return False, f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        
        return True, "Valid"
