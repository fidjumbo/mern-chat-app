import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = ({ isMobileView }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // clean function (unmount)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // Back button for mobile to go back to Sidebar
  const handleBack = () => setSelectedConversation(null);

  return (
    <div className="flex flex-col h-full relative w-[350px] md:min-w-[450px] p-3 md:px-0">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Mobile back button */}
          {isMobileView && (
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 z-10 bg-gray-700 text-white px-3 py-1 rounded-md"
            >
              Back
            </button>
          )}

          {/* header */}
          <div className="bg-slate-500 left-0 w-full top-3 flex gap-1 justify-end py-2 pr-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
