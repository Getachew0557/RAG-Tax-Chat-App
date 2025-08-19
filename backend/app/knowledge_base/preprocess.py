import os
import json
from ..rag.embeddings import Embeddings

def preprocess_documents():
    embeddings = Embeddings()
    documents = []

    # Load Amharic documents
    amharic_dir = 'app/knowledge_base/documents/amharic'
    for filename in os.listdir(amharic_dir):
        if filename.endswith('.json'):
            with open(os.path.join(amharic_dir, filename), 'r', encoding='utf-8') as f:
                doc = json.load(f)
                documents.append({'content': doc['content'], 'language': 'am'})

    # Load English documents
    english_dir = 'app/knowledge_base/documents/english'
    for filename in os.listdir(english_dir):
        if filename.endswith('.json'):
            with open(os.path.join(english_dir, filename), 'r', encoding='utf-8') as f:
                doc = json.load(f)
                documents.append({'content': doc['content'], 'language': 'en'})

    # Generate and index embeddings
    if documents:
        embeddings_data = embeddings.embed_documents(documents)
        embeddings.index_documents(documents, embeddings_data)
        print(f"Indexed {len(documents)} documents")
    else:
        print("No documents found")

if __name__ == "__main__":
    preprocess_documents()
