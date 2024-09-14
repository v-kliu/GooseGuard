# test_spam_detector.py

import pandas as pd
from transformers import BertTokenizer, BertForSequenceClassification
import torch

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

df_test = pd.read_csv('test.csv')

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
