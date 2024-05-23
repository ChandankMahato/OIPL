import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
import facebook from "../../Config/facebookConfig";

const FacebookMsg = () => {

  return (
    <FacebookProvider appId={facebook.appId} chatSupport>
      <CustomChat pageId={facebook.pageId} minimized={false} themeColor="#ec1839" />
    </FacebookProvider>
  );
}

export default FacebookMsg;
