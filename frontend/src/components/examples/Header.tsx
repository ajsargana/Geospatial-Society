import { useState } from "react";
import Header from "../Header";

export default function HeaderExample() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <Header 
      darkMode={darkMode} 
      toggleDarkMode={() => setDarkMode(!darkMode)} 
    />
  );
}