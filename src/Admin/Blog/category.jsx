import React from 'react';

const Category = ({ category,setCategory, handleCategory }) => {
    return  (
    <div className="category-admin-form">
        <form onSubmit={handleCategory}>
            <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input 
                type="text" 
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            </div>
            <button className="btn" type="submit">Submit</button>
        </form>
    </div>)
};

export default Category;
