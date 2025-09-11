import { Suspense, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import LoadingSuspense from './components/LoadingSuspense';
import useRoutes from './config/routes';
import AIChat from './pages/sCMMS/chat/AIChat';

function App() {
	const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = () => setIsChatOpen(open => !open);

  return (
    <>
      <Suspense fallback={<LoadingSuspense />}>
        <RouterProvider router={useRoutes()} />
      </Suspense>
      <AIChat isOpen={isChatOpen} onToggle={handleToggleChat} />
    </>
  );
}

export default App;
