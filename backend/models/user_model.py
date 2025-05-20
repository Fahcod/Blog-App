from pydantic import BaseModel

# the user model
class UserModel(BaseModel):
    fullname:str
    username:str
    email:str
    password:str
    profile:str="https://res.cloudinary.com/dtuatqheg/image/upload/v1736867796/oofp1azpdbc1ybvd35el.png"

class LoginModel(BaseModel):
    email:str
    password:str

class ProfileUpdate(BaseModel):
    user_id:str
    username:str
    profile:str