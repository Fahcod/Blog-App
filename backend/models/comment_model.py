from pydantic import BaseModel

# the comment model
class CommentModel(BaseModel):
    post_id:str
    author:str
    comment:str
    likes:list=[]
    replies:list=[]
