import { useState, useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { selectedConversation } = useConversation();

  // detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      
      {/* Show Sidebar only if no conversation is selected on mobile, or always on desktop */}
      {(selectedConversation === null || !isMobileView) && (
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
      )}

      {/* Show MessageContainer if a conversation is selected, or always on desktop */}
      {(selectedConversation !== null || !isMobileView) && (
        <div className="flex-1">
          <MessageContainer isMobileView={isMobileView} />
        </div>
      )}
    </div>
  );
};

export default Home;
