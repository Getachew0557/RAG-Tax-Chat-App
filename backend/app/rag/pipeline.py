import requests
import pymongo
from .embeddings import Embeddings
from dotenv import load_dotenv
import os
import re

load_dotenv()

class RAGPipeline:
    def __init__(self):
        self.embeddings = Embeddings()
        self.gemini_api_key = os.getenv('GEMINI_API_KEY')
        self.gemini_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
        self.mongo_client = pymongo.MongoClient(os.getenv('MONGODB_URI'))
        self.db = self.mongo_client['rag_tax_chat']
        self.sessions = self.db['sessions']

    def process_query(self, query, language):
        # Retrieve relevant documents
        retrieved_docs = self.embeddings.query(query, language, top_k=3)
        context = "\n".join([doc['text'] for doc in retrieved_docs])

        # Craft prompt for Gemini
        prompt = (
            f"Context: {context}\n\n"
            f"Question: {query}\n"
            f"Instructions: Provide a clear, concise, and accurate answer in {language}. "
            f"For numerical calculations, show step-by-step reasoning and ensure accuracy. "
            f"Do not repeat the question or context in the answer. "
            f"Return only the final answer or explanation."
        )

        # Prepare Gemini API request
        headers = {
            'Content-Type': 'application/json',
            'X-goog-api-key': self.gemini_api_key
        }
        data = {
            'contents': [
                {
                    'parts': [
                        {'text': prompt}
                    ]
                }
            ]
        }

        # Call Gemini API
        try:
            response = requests.post(self.gemini_url, headers=headers, json=data)
            response.raise_for_status()
            result = response.json()
            generated_text = result['candidates'][0]['content']['parts'][0]['text'].strip()

            # Clean response to avoid repetitions
            cleaned_response = re.sub(r'^(Context|Question):.*?\n', '', generated_text, flags=re.MULTILINE)

            # Store session
            session_data = {'query': query, 'response': cleaned_response, 'language': language}
            self.sessions.insert_one(session_data)

            return cleaned_response
        except Exception as e:
            error_msg = (
                'ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።' if language == 'am'
                else 'An error occurred. Please try again.'
            )
            self.sessions.insert_one({'query': query, 'response': error_msg, 'language': language})
            return error_msg
