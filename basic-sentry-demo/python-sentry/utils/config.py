from dotenv import load_dotenv
import os

load_dotenv()

SENTRY_ENDPOINT = os.getenv("SENTRY_ENDPOINT")
PORT = 3041