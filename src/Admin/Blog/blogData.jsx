import React from 'react';

const BlogData = ({ 
    handleBlogData, 
    selectedCategory,
    setSelectedCategory,
    setCategoryMap, 
    categories, 
    timeRead,
    setTimeRead, 
    title, 
    setTitle, 
    summary, 
    setSummary, 
    blogContent,
    blogId,
    setBlogId,
    getBlogData,
    handleDeleteClick}) => {

      const handleCategoryChange = (e) => {
        e.preventDefault();
        const selectedIndex = e.target.selectedIndex;
        if (selectedIndex > 0) {
          setCategoryMap(categories[selectedIndex - 1]);
          setSelectedCategory(e.target.value);
        } else {
          setCategoryMap(null);
          setSelectedCategory("");
        }
      };

      return  <div className="blogData-admin-form">
            <h4>Form To get Blog Data</h4>
            <form>
              <div className="form-group">
                  <label htmlFor="getdata">Blog Id:</label>
                  <input
                    type="text" 
                    id="getdata"
                    value={blogId}
                    onChange={(e) => setBlogId(e.target.value)}
                    required
                  />
                  <button 
                    className='btn'
                    onClick={(e) => getBlogData(e)}
                    style={{marginTop: '10px'}}
                  >
                      Get Data
                  </button>
                  <button 
                    className='btn'
                    onClick={(e) => handleDeleteClick(e)}
                    style={{margin: '10px'}}
                  >
                      Delete
                  </button>
                </div>
            </form>
            <div className="vertical-gap"></div>
            <h4>Form To Add & Update Blog Data</h4>
            <form onSubmit={handleBlogData}>
              <div className="form-group">
                <label htmlFor="categoryId">Category:</label>
                <select
                  id="categoryId"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" disabled>Select a Category</option>
                  {
                    categories.map((category) => (
                      <option 
                        key={category.id} 
                        value={category.title}
                      >
                        {category.title}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timeread">Time Read:</label>
                <input
                  type="text" 
                  id="timeread"
                  value={timeRead}
                  onChange={(e) => setTimeRead(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Blog Title:</label>
                <input
                  type="text" 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="summary">Blog Summary:</label>
                <input
                  type="text" 
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <p>Blog Content: {blogContent !== "" ? <span>Content Loaded</span> : ""}</p>
              </div>
              <button className="btn" type="submit">Submit</button>
            </form>
        </div>
};

export default BlogData;
