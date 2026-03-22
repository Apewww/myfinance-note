from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_DB = os.getenv("MONGODB_DB")
MONGODB_HOST = os.getenv("MONGODB_HOST")
MONGODB_PORT = int(os.getenv("MONGODB_PORT", 27017))
