# test_spam_detector.py

import pandas as pd
from transformers import BertTokenizer, BertForSequenceClassification
import torch

# Check if CUDA (GPU) is available, and set the device accordingly
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load the test dataset (without labels)
df_test = pd.read_csv('test.csv')

# Initialize BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('./spam_detector_tokenizer')

# Tokenize the testing data (for inference only)
test_encodings = tokenizer(df_test['transcript'].tolist(), truncation=True, padding=True, max_length=512, return_tensors="pt")

# Load the fine-tuned model and move it to the correct device
model = BertForSequenceClassification.from_pretrained('./spam_detector_model').to(device)

# Move the input data to the same device as the model
test_encodings = {key: val.to(device) for key, val in test_encodings.items()}

# Set the model to evaluation mode
model.eval()

# Run model predictions
with torch.no_grad():
    outputs = model(**test_encodings)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)

# Convert predictions to a readable format (e.g., 'fraud' or 'normal')
predicted_labels = ['fraud' if pred == 1 else 'normal' for pred in predictions.cpu().numpy()]

# Add predictions to the test DataFrame and save the results
df_test['predictions'] = predicted_labels
df_test.to_csv('test_predictions.csv', index=False)

print("Predictions saved to 'test_predictions.csv'.")
