import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';



    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


    // Upload function
  const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null;
          const response=await  cloudinary.uploader.upload(localFilePath, { 
            resource_type: 'auto' 
        }, );
        console.log('file is uploaded on cloudinary', response.url);
        return response.url;
        
        } catch (error) {
           fs.unlinkSync(localFilePath);
            console.log('file is not uploaded on cloudinary', error);
            return null;
        }
    };

    export {uploadOnCloudinary}
