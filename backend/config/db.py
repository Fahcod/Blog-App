from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
# Load environment variables from .env file
load_dotenv()

URI=os.getenv("MONGO_URI")

client = MongoClient(URI,server_api=ServerApi("1"))

db=client.Blogspot

#the users collection
users_collection = db["users"]

#the products collection
blogs_collection = db["blogs"]

# the comments collection
comments_collection=db["comments"]

try:

    client.admin.command('ping')
    print("DB connected connected successfully")

except Exception as e:
    print(e)