import React from "react";
import Blogs from "./Components/Blogs/Blogs";
import Chatbox from "./Components/Chatbox/Chatbox";
import Collection from "./Components/Collection/Collection";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import Statistics from "./Components/Statistics/Statistics";
import WorkFlow from "./Components/workflow/WorkFlow";
function App() {
  
  return (
    <>
      <header className="header">
      <Navbar />
      <Hero />
      </header>
      <WorkFlow/>
      <Collection />
      <Statistics />
      <Blogs />
      <Footer />
      <Chatbox/>
    </>
  );
}

export default App;
