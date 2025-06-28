import { FC, ReactElement, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppRouter from './AppRoutes';
import useBeforeWindowUnload from './shared/hooks/useBeforeWindowUnload';
import { socketService } from './sockets/socket.service';
import InfoModal from './features/info-modal';

const App: FC = (): ReactElement => {
  const [isInfoModal, setIsInfoModal] = useState(false);

  useBeforeWindowUnload();

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      <BrowserRouter>
        {isInfoModal && (
          // <ReviewModal type="buyer-review" order={order} onClose={() => setOrderReviewModal({ ...orderReviewModal, buyerReview: false })} />

          <InfoModal
            onClose={() => {
              console.log('hello');
              setIsInfoModal(false);
            }}
          />
        )}

        <div className="w-screen min-h-screen flex flex-col relative">
          <AppRouter />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
