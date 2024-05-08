import React from "react";
import { SignIn, UserButton, SignedIn, useUser } from "gatsby-plugin-clerk";

const Clerk = () => {
  return (
    <div>
      <SignIn>
        <UserButton />
      </SignIn>
      <SignedIn>
        <div>hello</div>
      </SignedIn>
    </div>
  );
};

export default Clerk;
