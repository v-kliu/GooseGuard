from transformers import BertTokenizer, AutoModelForSequenceClassification, pipeline
import torch
import requests
from dotenv import load_dotenv
import os
load_dotenv()

name = "zelchy/scam-detection"
tokenizer = BertTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)
tokenizer.push_to_hub(name)
model.push_to_hub(name)


def model_result(transcription: str):
    classifier = pipeline('sentiment-analysis', model=model, tokenizer=tokenizer)

    # Get prediction results from the pipeline
    result = classifier(transcription)
    predicted_label = result[0]['label']
    return True if predicted_label == 'LABEL_1' else False


def api_result(transcription: str):
    api_token = os.getenv("HF_API_KEY")

    headers = {
        "Authorization": f"Bearer {api_token}"
    }

    data = {
        "inputs": transcription
    }

    response = requests.post(f"https://api-inference.huggingface.co/models/{name}", headers=headers, json=data)
    result = response.json()
    predicted_label = result[0][0]['label']  # This will be 'LABEL_0' or 'LABEL_1'
    return True if predicted_label == 'LABEL_1' else False

if __name__ == "__main__":
    for mock_data in [
        ("Hi, please call 9712 to get your credit card back. It has been stuck in the shipment at Port Waterloo", True),
        ("Hi, I'm Humpty Dumpty and I'm sitting on a wall", False),
        ("Hi, I'm calling to congratulate you on your, the cruise that you went to Bahamas. Please put your credit card pin after the beep", True),
        ("I had a great day today. I worked on a lot of projects", False)
    ]:
        print(f"Local: Got {model_result(mock_data[0])} -> Expected {mock_data[1]}", end=" | ")
        print(f"API: Got {api_result(mock_data[0])} -> Expected {mock_data[1]}")