from deep_translator import GoogleTranslator
try:
    translated = GoogleTranslator(source='en', target='es').translate("Hello")
    print(f"Success: {translated}")
except Exception as e:
    print(f"Error: {e}")
