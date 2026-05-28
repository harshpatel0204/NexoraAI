import os
import sys

# Add parent directory to path so we can import main and core
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

