from transformers import BertTokenizer, BertForSequenceClassification
import torch

def result(transcription):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')

    test_encodings = tokenizer([transcription], truncation=True, padding=True, max_length=512, return_tensors="pt")

    model = BertForSequenceClassification.from_pretrained('./model/spam_detector_model').to(device)

    test_encodings = {key: val.to(device) for key, val in test_encodings.items()}

    model.eval()

    with torch.no_grad():
        outputs = model(**test_encodings)
        logits = outputs.logits
        predictions = torch.argmax(logits, dim=-1)

    predicted_labels = [True if pred == 1 else False for pred in predictions.cpu().numpy()]
    return predicted_labels[0]

if __name__ == "__main__":
    for mock_data in [
        ("Hi, please call 9712 to get your credit card back. It has been stuck in the shipment at Port Waterloo", True),
        ("Hi, I'm Humpty Dumpty and I'm sitting on a wall", False),
        ("Hi, I'm calling to congratulate you on your, the cruise that you went to Bahamas. Please put your credit card pin after the beep", True),
        ("I had a great day today. I worked on a lot of projects", False)
    ]:
        print(f"Got {result(mock_data[0])} -> Expected {mock_data[1]}")