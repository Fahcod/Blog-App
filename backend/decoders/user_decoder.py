

# decode a single user document
def decode_user(data)->dict:
    return {
        "_id":str(data["_id"]),
        "username":data["username"],
        "fullname":data["fullname"],
        "email":data["email"],
        "profile":data["profile"],
        "followers":data["followers"],
        "following":data["following"]
    }