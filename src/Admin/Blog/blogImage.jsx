import React from 'react';
import CopyLinkContainer from '../../Utility/copyURL';

const BlogImage = ({ 
        handleImageChange, 
        handleImageSubmit, 
        imageDownloadURL, 
        buttonStyle, 
        handleURLCopy, 
        copyURL
    }) => {
    return  (
        <div className="blogImage-admin-form">
          <form onSubmit={handleImageSubmit}>
            <div className="form-group">
              <label htmlFor="blogimage">Blog Image:</label>
              <input 
                type="file" 
                id="blogimage"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <button className="btn" type="submit">Upload Image</button>
          </form>
          <CopyLinkContainer
            URL={imageDownloadURL}
            handleURLCopy={handleURLCopy}
            copyURL={copyURL}
          />
        </div>
    )
};

export default BlogImage;
