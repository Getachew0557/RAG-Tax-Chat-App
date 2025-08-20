from sentence_transformers import SentenceTransformer
import os
import json
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

load_dotenv()

class Embeddings:
    def __init__(self):
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
        self.pinecone_client = None
        self.pinecone_index = None
        self.init_pinecone()

    def init_pinecone(self):
        self.pinecone_client = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
        index_name = 'tax-documents'

        if index_name not in self.pinecone_client.list_indexes().names():
            self.pinecone_client.create_index(
                name=index_name,
                dimension=384,
                metric='cosine',
                spec=ServerlessSpec(cloud='aws', region='us-east-1')
            )
        self.pinecone_index = self.pinecone_client.Index(index_name)

    def embed_documents(self, documents):
        embeddings = self.model.encode([doc['content'] for doc in documents], show_progress_bar=True)
        return embeddings

    def index_documents(self, documents, embeddings):
        vectors = [
            (str(i), embedding.tolist(), {'text': doc['content'], 'language': doc['language']})
            for i, (doc, embedding) in enumerate(zip(documents, embeddings))
        ]
        self.pinecone_index.upsert(vectors=vectors)

    def query(self, text, language, top_k=3):
        query_embedding = self.model.encode([text])[0].tolist()
        results = self.pinecone_index.query(vector=query_embedding, top_k=top_k, include_metadata=True)
        return [
            {'text': match['metadata']['text'], 'language': match['metadata']['language']}
            for match in results['matches']
            if match['metadata']['language'] == language
        ]
