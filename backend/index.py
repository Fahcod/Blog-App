from fastapi import FastAPI
import uvicorn
from routes.entry import entry_router
from routes.user_route import user_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.file_route import file_router
from routes.blog_route import blog_router
from routes.comment_route import comment_router

app = FastAPI(description='This is the blog app api')

#enable cross origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET","POST","PUT","DELETE"],
    allow_headers=["*"]
)

# mount the static folder to the '/static' endpoint
app.mount('/static',StaticFiles(directory='backend/static'),name='static')

#add the routers
app.include_router(entry_router)
app.include_router(user_router)
app.include_router(file_router)
app.include_router(blog_router)
app.include_router(comment_router)

if __name__ == '__main__':
    app.debug=True
    uvicorn.run(app=app,host='0.0.0.0',port=4500)