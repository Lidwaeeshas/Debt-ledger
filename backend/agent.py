from google import genai
from google.genai import types
from pydantic import BaseModel, Field
import os 


api = os.getenv("GEMINI_API")

class DebtLedger(BaseModel):
    debtor_name: str = Field(
        description="The full name of the person who owes the money."
    )
    amount: float = Field(description="The total amount of debt.")
    liability: str = Field(
        description="The reason or item collected that led to the debt."
    )
    repayment_date: Optional[str] = Field(
        None, description="The agreed upon date for repayment."
    )
    debtor_phone: Optional[str] = Field(
        None, description="The phone number of the debtor, if provided."
    )
    has_guarantor: bool = Field(
        description="True if a guarantor is mentioned, False otherwise."
    )


client = genai.Client(api_key=api)

prompt = """
        You are an agent who perses prompt and extract debt ledger 
        *** things that you should collect from the prompts ***
        1. debtor name
        2. amount
        3. liability (what is collected that leads to the debt)
        4. date that was greed upon the repayment should be made
        5. phone number of  the debtor if it is given
        6. gurantor if he has 
        7. the name of the guarantorr if he has 

        your result should be a json 
"""


def json_resonse(msg):
    system_rules = f"""
    You are an advanced multilingual data extraction assistant. 
    Analyze the provided text block and extract the debt ledger information according to the schema.
    
    CRITICAL LANGUAGE GUIDE: 
    - You must focus on and output all text values (like liability or names if translated) in: {language_focus}.
    - Pay close attention to financial terms and numbering formats specific to this language context.
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        content=msg,
        config=types.GenerateContentConfig(
            system_instruction=system_rules,
            response_mime_type="application/json",
            response_schema=DebtLedger,
        ),
    )
    return DebtLedger.model_validate_json(response.text)


agent = creat_react_agent()
