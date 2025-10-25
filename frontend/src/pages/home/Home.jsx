import { useState, useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { selectedConversation } = useConversation();

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className='flex sm:h-[450px] md:h-[550px] h-[85vh] mx-auto rounded-lg overflow-hidden 
      bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
    >
      {/* Sidebar — show always on desktop, only when no chat selected on mobile */}
      {(!isMobileView || selectedConversation === null) && <Sidebar />}

      {/* Message container — show always on desktop, only when chat selected on mobile */}
      {(!isMobileView || selectedConversation !== null) && (
        <MessageContainer isMobileView={isMobileView} />
      )}
    </div>
  );
};

export default Home;
