from pydantic import BaseModel

# create the blog model
class BlogModel(BaseModel):
    author:str=None
    title:str
    image:str
    description:str
    category:str
    likes:list=[]
    comments:list=[]
    views:list=[]
