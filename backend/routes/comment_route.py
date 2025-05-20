from models.comment_model import CommentModel
from fastapi import APIRouter,HTTPException,status
from fastapi.responses import JSONResponse
from utils.version import version
from config.db import comments_collection
from bson import ObjectId

# declare the comment router
comment_router=APIRouter(prefix=f'/api/{version}/comments')

# THE ADD COMMENT ENDPOINT
@comment_router.post('/add')
def add_comment(data:CommentModel):
    try:
        comment=dict(data)

        comment["post_id"]=ObjectId(comment["post_id"])
        comment["author"]=ObjectId(comment["author"])
        
        comments_collection.insert_one(comment)
        content={
            "success":True,
            "message":"Comment added successfully"
        }
        response=JSONResponse(content=content,status_code=status.HTTP_201_CREATED)
        return response

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="An error occured")


