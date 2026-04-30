#!/usr/bin/env python3
import json

# Try to load the pt_BR.json file
try:
    with open(r'C:\dev\donbrico-net\locales\pt_BR.json', 'r', encoding='utf-8') as f:
        content = f.read()
        print(f"File length: {len(content)} characters")
        
        # Try to parse as JSON
        data = json.loads(content)
        print("Successfully parsed as JSON!")
        
except json.JSONDecodeError as e:
    print(f"JSON Decode Error: {e}")
    print(f"Error at line {e.lineno}, column {e.colno}")
    print(f"Error at position {e.pos}")
    
    # Show context around the error
    start = max(0, e.pos - 50)
    end = min(len(content), e.pos + 50)
    context = content[start:end]
    print(f"Context: ...{context}...")
    print(f"Error pointer: {' ' * (e.pos - start + 3)}^")
    
    # Try to find if there's extra data after the main JSON object
    # Try parsing incrementally
    for i in range(len(content), 0, -1):
        try:
            json.loads(content[:i])
            print(f"Valid JSON ends at position {i}")
            if i < len(content):
                extra = content[i:]
                print(f"Extra data ({len(extra)} chars): {repr(extra[:100])}")
            break
        except:
            continue

except Exception as e:
    print(f"Other error: {e}")