import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        videoUrl:{
            type:String,
            required:true,
        },
        thumbnail:{
            type:String,
            default:"cloudinary.com/default-thumbnail.png",
        },
        views:{
            type:Number,
            default:0,
        },
        ispublished:{
            type:Boolean,
            default:false,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        likes:{
            type:Number, 
            default:0,
        },
        dislikes:{
            type:Number,
            default:0,
        },
        comments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Comment",
                default:[]
            }
        ],

}
,{ timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate); 

 export const Video=mongoose.model("Video",videoSchema)