import React, { useState } from "react";
import TODOListViewer from "./TODOListViewer";
import ControlPanel from "./ControlPanel";
import { Card } from "@material-tailwind/react";

// This TODOListMainView component represents the main view of the TODOlist,
// displaying the list of TODOItems based on the selected category.
const TODOListMainView = () => {
  // The selectedCategory state variable keeps track of the currently selected
  // category in the TODOList.
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Card className="flex flex-col items-center m-3 p-10 w-9/12">
      <TODOListViewer selectedCategory={selectedCategory} />
      <ControlPanel setSelectedCategory={setSelectedCategory} />
    </Card>
  );
};

export default TODOListMainView;
