import cloudinary.uploader
from fastapi import UploadFile,File,APIRouter
from fastapi.responses import JSONResponse
from fastapi import status
from utils.version import version
import shutil
import random
from config.cloudinary import configure_cloudinary
import cloudinary

file_router=APIRouter(prefix=f'/api/{version}/files')

configure_cloudinary()

# UPLOAD AN IMAGE
@file_router.post('/upload')
def upload_image(file:UploadFile=File(...)):
    # #generate a hash
    # hash_string=random.random() * 44
    # #generate a random file name
    # destination='backend/static/{hash}_{filename}'

    # file_dest=destination.format(hash=hash_string,filename=file.filename)
    # image_url='http://localhost:4500/static/{hash}_{filename}'

    # IMAGE_URL=image_url.format(hash=hash_string,filename=file.filename)
    
    # with open(file_dest,"wb") as buffer:
    # shutil.copyfileobj(file.file,buffer)

    result = cloudinary.uploader.upload(file.file)

    IMAGE_URL=result["secure_url"]

    content={
        "success":True,
        "image_url":IMAGE_URL
        }
    response = JSONResponse(content=content,status_code=status.HTTP_201_CREATED)
    return response
    