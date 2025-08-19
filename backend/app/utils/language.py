from langdetect import detect

def detect_language(text):
    try:
        lang = detect(text)
        return 'am' if lang == 'am' else 'en'  # Simplify to Amharic or English
    except:
        return 'en'  # Fallback to English