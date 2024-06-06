const Post=require("../model/postModel");
const Like=require("../model/likeModel");

exports.likePost=async(req,res)=>{
try{
const {post,user}=req.body;
const like=new Like({
    post,user
}); 
const savedLike=await like.save();
const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})//updated return karna
                   .populate("likes")
                   .exec();
     res.json({
        post:updatedPost,
     });
}                    
catch(error){
   
 return res.status(400).json({
    error:"Error while liking",
 });
}
}
exports.unlikePost=async(req,res)=>{
    try{
        const {post,like}=req.body;
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like});

        const updatedPost=await Post.findByIdAndUpdate(post,
               {$pull:{likes:deletedLike._id}},   {new:true},
        )
        res.json({
            post:updatedPost,
        })
    }                    
    catch(error){
       
     return res.status(400).json({
        error:"Error while unliking",
     });
    }
    }