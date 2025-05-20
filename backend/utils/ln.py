
# result = orders_collection.aggregate([
#     {
#         "$lookup":{
#             "from":"users",
#             "localfield":"user_id",
#             "foreignField":"_id",
#             "as":"user"
#         }
#     },{
#         "$unwind":"$user"
#     },{
#         "$addFields":{
#             "user":"$user"
#         }
#     }
# ])