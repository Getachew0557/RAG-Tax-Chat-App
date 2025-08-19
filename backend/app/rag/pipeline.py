from transformers import pipeline
from .embeddings import Embeddings
import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

class RAGPipeline:
    def __init__(self):
        self.embeddings = Embeddings()
        self.generator = pipeline('text-generation', model='gpt2')  # Placeholder; replace with multilingual model
        self.mongo_client = pymongo.MongoClient(os.getenv('MONGODB_URI'))
        self.db = self.mongo_client['rag_tax_chat']
        self.sessions = self.db['sessions']

    def process_query(self, query, language):
        # Retrieve relevant documents
        retrieved_docs = self.embeddings.query(query, language, top_k=3)
        context = "\n".join([doc['text'] for doc in retrieved_docs])

        # Generate response
        prompt = f"Context: {context}\n\nQuestion: {query}\nAnswer in {language}:"
        response = self.generator(prompt, max_length=200, num_return_sequences=1)[0]['generated_text']

        # Store session
        session_data = {'query': query, 'response': response, 'language': language}
        self.sessions.insert_one(session_data)

        return response
