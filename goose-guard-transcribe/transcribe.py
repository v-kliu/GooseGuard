import os
from groq import Groq
from dotenv import load_dotenv
import pandas as pd
from transformers import BertTokenizer, BertForSequenceClassification
import torch

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
INPUT_FILE_LOCATION = "input/recording.m4a"
OUTPUT_FILE_LOCATION = "output/transcript_input.csv"  # Renamed for clarity

with open(INPUT_FILE_LOCATION, "rb") as file:
    transcription = client.audio.transcriptions.create(
        file=(INPUT_FILE_LOCATION, file.read()),  # Required audio file
        model="distil-whisper-large-v3-en",
        response_format="verbose_json"
    )

df = pd.DataFrame([{
    'transcript': transcription.text
}])
df.to_csv(OUTPUT_FILE_LOCATION, index=False)

df_test = pd.read_csv(OUTPUT_FILE_LOCATION)

tokenizer = BertTokenizer.from_pretrained('./spam_detector_tokenizer')

test_encodings = tokenizer(df_test['transcript'].tolist(), truncation=True, padding=True, max_length=512, return_tensors="pt")

model = BertForSequenceClassification.from_pretrained('./spam_detector_model').to(device)

test_encodings = {key: val.to(device) for key, val in test_encodings.items()}

model.eval()

with torch.no_grad():
    outputs = model(**test_encodings)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)

predicted_labels = ['fraud' if pred == 1 else 'normal' for pred in predictions.cpu().numpy()]

df_test['predictions'] = predicted_labels
df_test.to_csv('test_predictions.csv', index=False)

print("Predictions saved to 'test_predictions.csv'.")
