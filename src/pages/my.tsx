import FlowUserList from "@/components/main/FlowUserList";
import ChangePassword from "@/components/main/ChangePassword";
import React, { useEffect, useState } from "react";

const MyPage: React.FC = () => {
  return (
    <div>
      <FlowUserList></FlowUserList>
      <ChangePassword></ChangePassword>
    </div>
  );
};

export default MyPage;
