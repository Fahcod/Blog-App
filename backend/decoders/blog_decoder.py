
# function to decode a blg
def decode_blog(data)->dict:
     return{
          "_id":str(data["_id"]),
          "author":str(data["author"]),
          "title":data["title"],
          "image":data["image"],
          "description":data["description"],
          "category":data["category"],
          "likes":data["likes"],
          "comments":data["comments"],
          "views":data["views"]
     }

# decode many blogs
def decode_blogs(data)->list:
     return [decode_blog(blog) for blog in data]