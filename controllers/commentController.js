const Post=require("../model/postModel");
const Comment=require("../model/commentModel");

exports.createComment=async(req,res)=>{
try{
const {post,user,body}=req.body;
const comment=new Comment({
    post,user,body
}); 
const savedComment=await comment.save();
const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})//updated return karna
                   .populate("comments")
                   .exec();
     res.json({
        post:updatedPost,
     });
}                    
catch(error){
    console.error(error);
    console.log(error);
 return res.status(500).json({
    error:"Error while creating comment",
 });
}
}