from fastapi import HTTPException,APIRouter,status
from fastapi import Cookie
from fastapi.responses import JSONResponse
from models.user_model import UserModel,LoginModel,ProfileUpdate
from config.db import users_collection
from jose import jwt
from decoders.user_decoder import decode_user
from datetime import datetime,timedelta
import bcrypt
from utils.token import token_parser
from utils.version import version
import os
from dotenv import load_dotenv
import email_validator
from datetime import datetime
from bson import ObjectId

load_dotenv()

#load some variables
ALGORITHM:str=os.getenv('ALGORITHM')
JWT_SECRET:str=os.getenv('JWT_SECRET')

# declare the user router
user_router = APIRouter(prefix=f'/api/{version}/user')

#The function to hash the user password
def hash_password(password:str):
    salt = bcrypt.gensalt()
    hashed_password=bcrypt.hashpw(password=password.encode('utf-8'),salt=salt)
    return hashed_password.decode('utf-8')

#the function to generate the jwt token
def create_token(user_email:str,user_id:str,expires_delta:timedelta):
    expires=datetime.utcnow() + expires_delta
    payload={'sub':user_email,'user_id':str(user_id)}
    payload.update({'exp':expires})
    return jwt.encode(payload,JWT_SECRET,algorithm=ALGORITHM)

#THE USER SIGNUP ENDPOINT
@user_router.post('/signup')
def signup_user(userObj:UserModel):
    data=dict(userObj)
    #get the user email and password
    email=data["email"]
    password=data["password"]
    # validate the user email
    email_check=email_validator.validate_email(email)
    if(not email_check):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='This email is invalid')
    
    # check if the user already exists
    user = users_collection.find_one({'email':email})
    if(user):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="This email is already taken")
    
    # if the user does not exist, hash the user password
    hashed_password=hash_password(password)
    data["password"]=hashed_password

    # add the other fields
    data["followers"]=[]
    data["following"]=[]

    # save the user
    try:
       result=users_collection.insert_one(data)
       id=result.inserted_id
       #generate the token
       token=create_token(email,id,timedelta(days=30))
       content={
       "success":True,
       "message":"Account created successfully"
       }
       response=JSONResponse(content=content,status_code=201)
       response.set_cookie(key='blgauth',value=token,httponly=True,secure=True,expires=1000 * 60 * 60 * 24 * 30)

       return response
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="An error occured")
    

#THE LOGIN ENDPOINT
@user_router.post('/login')
def login_user(userObj:LoginModel):
    try:
        data=dict(userObj)
         # extract the user email
        email=data["email"]
        password=data["password"]
         # validate the email
        email_check=email_validator.validate_email(email)
        if(not email_check):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='This email is invalid')
        
        #find the user
        user = users_collection.find_one({'email':email})
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='This user was not found')

        # if the user is available,compare the passwords
        PASS_COMPARE=bcrypt.checkpw(password.encode('utf-8'),user["password"].encode('utf-8'))
        if not PASS_COMPARE:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="This is a wrong password")
        
        id:str=str(user["_id"])
        token=create_token(email,id,timedelta(days=30))

        content={
        "success":True,
        "message":"Logged in successfully"
        }
        response=JSONResponse(content=content,status_code=201)
        response.set_cookie(key='blgauth',value=token,httponly=True,secure=True,expires=1000 * 60 * 60 * 24 * 30)
        return response
    # try finding the user 
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server error")


#USER PROFILE UPDATE
@user_router.put('/update-profile')
def update_profile(userData:ProfileUpdate):
    try:
        data=dict(userData)

        username=data["username"]
        profile_pic=data["profile"]
        userId=data["user_id"]
        users_collection.update_one({"_id":ObjectId(userId)},{'$set':{"profile":profile_pic,"username":username}})
        response = {
            "status":201,
            "message":"Profile updated successfully"
        }

        return response
    
    except Exception as e:
           print(e)
           raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    
    
#THE FETCH USER ENDPOINT
@user_router.get('/get')
def fetch_user(blgauth:str=Cookie()):
     try:
         token=blgauth
         if(not token):
           raise HTTPException(status_code=401,detail="You are not logged in")
         USER_ID=token_parser(token)
         # try fetching the user
         user = users_collection.find_one({"_id":ObjectId(USER_ID)})
         #if the user does not exist, throw an error
         if not user:
             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
         
         result = decode_user(user)
         content={
             "success":True,
             "data":result
         }
         response = JSONResponse(content=content,status_code=200)
         return response
         
     except Exception as e:
         print(e)
         raise HTTPException(status_code=500,detail='Internal server error')


#THE ENDPOINT FOR FOLLOWING OR UNFOLLOWING A USER
@user_router.put('/follow/{other_id}')
def follow_user(other_id:str,blgauth:str=Cookie()):
     try:
         token=blgauth
         if (not token):
          raise HTTPException(status_code=401,detail="You are not logged in")
         # get the user id and fetch the user
         USER_ID=token_parser(token) 

         user = users_collection.find_one({"_id":ObjectId(USER_ID)})
         following_list:list=user["following"]

         if other_id in following_list:
             following_list.remove(other_id)
            #  update the database
             users_collection.update_one({"_id":ObjectId(USER_ID)},{"$pull":{"following":other_id}})
             users_collection.update_one({"_id":ObjectId(other_id)},{"$pull":{"followers":USER_ID}})
        
         # if the user is not being followed, then follow the user
         users_collection.update_one({"_id":ObjectId(USER_ID)},{"$push":{"following":other_id}})
         users_collection.update_one({"_id":ObjectId(other_id)},{"$push":{"followers":USER_ID}})
         content={
             "success":True,
             "message":"User updated successfully"
         }
         response=JSONResponse(content=content,status_code=201)
         return response
         
     except Exception as e:
         print(e)
         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="An error occured")