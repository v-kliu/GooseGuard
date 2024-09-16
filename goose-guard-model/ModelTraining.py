# train_spam_detector.py

import pandas as pd
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
import torch

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

df_train = pd.read_csv('cleaned_fraud_dataset_training.csv')

# Map 'fraud' and 'normal' to numerical labels
df_train['label'] = df_train['label'].map({'fraud': 1, 'normal': 0})
tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')

train_encodings = tokenizer(df_train['transcription'].tolist(), truncation=True, padding=True, max_length=512)

class SpamDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels=None):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        if self.labels is not None:
            item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels) if self.labels is not None else len(self.encodings['input_ids'])

train_dataset = SpamDataset(train_encodings, df_train['label'].tolist())

model = BertForSequenceClassification.from_pretrained('bert-large-uncased', num_labels=2).to(device)

training_args = TrainingArguments(
    output_dir='./results',
    evaluation_strategy="no",  # Disable evaluation during training
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir='./logs',
)

# Initialize the trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model
model.save_pretrained('./spam_detector_model')
tokenizer.save_pretrained('./spam_detector_tokenizer')

print("Training complete and model saved.")
