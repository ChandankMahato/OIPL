import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const EDITOR = ({ placeholder, blogContent, setBlogContent }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={blogContent}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setBlogContent(newContent)}
      onChange={(newContent) => {setBlogContent(newContent)}}
    />
  );
};

export default EDITOR;
