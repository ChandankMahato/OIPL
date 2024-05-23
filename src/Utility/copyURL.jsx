import React from 'react';

const CopyLinkContainer = ({ URL, handleURLCopy, copyURL }) => {
  
    const buttonStyle = {
    backgroundColor: copyURL ? 'green' : '',
  };

  return (
    <div className="copy-image-container">
      <input readOnly value={URL}></input>
      <button style={buttonStyle} className="copy-image-link" onClick={handleURLCopy}>
        {copyURL ? 'Copied' : 'Copy URL'}
      </button>
    </div>
  );
};

export default CopyLinkContainer;
