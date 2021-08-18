import { useState } from "react";

import "./RoomsPage.css";
import BubbleButton from "components/BubbleButton";
export default function RoomsPage() {
  const [btnClicked, setbtnClicked] = useState(true);

  return (
    <div>
      <h1
        style={{
          fontFamily: "DM Serif Display",
        }}
      >
        For you
      </h1>
      <BubbleButton
        clicked={btnClicked}
        onClick={() => setbtnClicked((clickState) => !clickState)}
      >
        Hello World!
      </BubbleButton>
    </div>
  );
}
