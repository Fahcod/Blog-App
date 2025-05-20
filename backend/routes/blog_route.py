from fastapi import APIRouter,HTTPException,status,Cookie
from models.blog_model import BlogModel
from fastapi.responses import JSONResponse
from utils.version import version
from bson import ObjectId
from config.db import blogs_collection
from decoders.blog_decoder import decode_blogs
from utils.token import token_parser
    
# declare the blog router
blog_router=APIRouter(prefix=f'/api/{version}/blogs')

#THE BLOG CREATION ENDPOINT
@blog_router.post('/create')
def create_blog(data:BlogModel,blgauth:str=Cookie()):
    try:
        blog=dict(data)
        # get the user id
        USER_ID=token_parser(blgauth)
        # set the author id
        blog["author"]=ObjectId(USER_ID)
        # try saving the blog
        blogs_collection.insert_one(blog)
        content={
            "success":True,
            "message":"Blog created successfully"
        }
        response=JSONResponse(content=content,status_code=status.HTTP_201_CREATED)
        return response

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="An error occured")

# THE BLOG FETCH ENDPOINT
@blog_router.get('/get')
def get_blogs():
    try:
       result=blogs_collection.find()
       data=decode_blogs(result)
       content={
            "success":True,
            "data":data
        }
       response=JSONResponse(content=content,status_code=status.HTTP_200_OK)
       return response
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,detail='Internal server error')


# THE UPDATE BLOG ENDPOINT
@blog_router.put('/update')
def update_blog():
    pass

#THE DELETE BLOG ENDPOINT
@blog_router.delete('/delete/{item_id}')
def delete_blog(item_id:str):
    try:
        # try deleting the blog
        blogs_collection.delete_one({"_id":ObjectId(item_id)})
        content={
            "success":True,
            "message":"Blog deleted successfully"
        }
        response=JSONResponse(content=content,status_code=status.HTTP_202_ACCEPTED)
        return response
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="An error occured")
    
# ENDPOINT TO LIKE A BLOG
@blog_router.put('/like/{blog_id}')
def like_blog(blog_id:str,blgauth:str=Cookie()):
    try:
        
        user_id=token_parser(blgauth)
        # find the blog post
        blog:dict=blogs_collection.find_one({"_id":ObjectId(blog_id)})
        likes_arr:list=blog["likes"]
        if user_id in likes_arr:
            likes_arr.remove(user_id)
        else:
            likes_arr.append(user_id)
        
        blogs_collection.update_one({"_id":ObjectId(blog_id)},{"$set":{"likes":likes_arr}})
        content={
            "success":True,
            "message":"Blog liked successfully"   
        }
        response=JSONResponse(content=content,status_code=status.HTTP_201_CREATED)
        return response

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="An error occured")

#THE BLOG VIEWS UPDATE ENDPOINT
@blog_router.put('/view/{blog_id}')
def view_blog(blog_id:str,blgauth:str=Cookie()):
    try:
        user_id=token_parser(blgauth)
        # try finding the blog post
        blog:dict=blogs_collection.find_one({"_id":ObjectId(blog_id)})
        views_arr:list=blog["views"]
        if user_id not in views_arr:
            views_arr.append(user_id)
            blogs_collection.update_one({"_id":ObjectId(blog_id)},{"$set":{"views":views_arr}})
            content={
            "success":True,
            "message":"Blog viewd successfully"
            }
            response=JSONResponse(content=content,status_code=status.HTTP_201_CREATED)
            return response
        else:
            res={
                "status":201,
                "success":True,
                "message":"Blog viewd successfully"
            }

            return res

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="An error occured")