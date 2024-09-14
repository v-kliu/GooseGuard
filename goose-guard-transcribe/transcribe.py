import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
INPUT_FILE_LOCATION = "input/recording.m4a"
OUTPUT_FILE_LOCATION = "output/data.txt"

with open(INPUT_FILE_LOCATION, "rb") as file:
    transcription = client.audio.transcriptions.create(
        file=(INPUT_FILE_LOCATION, file.read()), # Required audio file
        model="distil-whisper-large-v3-en",
        response_format="verbose_json"
    )
    with open(OUTPUT_FILE_LOCATION, "a") as f:
        f.write(transcription.text)

