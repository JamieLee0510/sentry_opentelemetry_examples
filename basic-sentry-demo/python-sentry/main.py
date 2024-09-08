from fastapi import FastAPI, Request
import sentry_sdk
import uvicorn
from utils.config import PORT, SENTRY_ENDPOINT

sentry_sdk.init(
    dsn=SENTRY_ENDPOINT,
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for tracing.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.get("/api/test-py-sentry/get")
async def test_endpoint(request: Request):
    print(request.headers)
    return {"message": "Hello Python Sentry"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
