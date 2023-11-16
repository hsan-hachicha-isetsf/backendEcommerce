const express=require("express")
const router=express.Router()
const Article = require("../models/article")

router.get("/",async(req,res)=>{
    
    try {
       const art = await Article.find().populate ("scategorieID")
       
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({message:error.message})
        }
    
})

router.post("/",async(req,res)=>{
    const nouvarticle = new Article(req.body)
    try {
    await nouvarticle.save();
   // const articles = await  Article.findById(response._id).populate("scategorieID").exec();
    res.status(200).json(nouvarticle);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
})
router.put("/:articleId",async(req,res)=>{
    try {
        const art = await Article.findByIdAndUpdate(
        req.params.articleId,
        { $set: req.body },
        { new: true }
        );
       
        res.status(200).json(art);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        
})
router.delete("/:articleId",async(req,res)=>{
    const id = req.params.articleId;
    try {
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "article deleted successfully." });
    } catch (error) {
    res.status(404).json({ message: error.message });
    } 
})
router.get("/:articleId",async(req,res)=>{
    try {
        const art = await Article.findById(req.params.articleId).populate ("scategorieID");
        res.status(200).json(art);
        19
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        
})
module.exports=router