import pytest
from ..app.rag.pipeline import RAGPipeline

@pytest.fixture
def rag_pipeline():
    return RAGPipeline()

def test_rag_pipeline(rag_pipeline):
    query = "What is income tax?"
    language = "en"
    response = rag_pipeline.process_query(query, language)
    assert isinstance(response, str)
    assert len(response) > 0

def test_amharic_query(rag_pipeline):
    query = "የግብር ከፊል ምንድን ነው?"
    language = "am"
    response = rag_pipeline.process_query(query, language)
    assert isinstance(response, str)
    assert len(response) > 0
