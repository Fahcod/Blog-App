from jose import jwt,JWTError
from fastapi import HTTPException
import os
from dotenv import load_dotenv
load_dotenv()

#extract some variables
ALGORITHM=os.getenv('ALGORITHM')
JWT_SECRET=os.getenv('JWT_SECRET')

def token_parser(token:any)->str:
    try:
        payload=jwt.decode(token,JWT_SECRET,algorithms=[ALGORITHM])
        # after decoding, extract the user_id from the payload
        user_id:str=payload.get("user_id")
        return user_id

    except JWTError:
        raise HTTPException(status_code=400,detail='Error decoding the token')