import { useState } from 'react';
import Modal from 'react-modal';

export const ModalHolder = ({ contentToShow }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}> Show Modal</button>

      <Modal isOpen={visibility}>
        <div>{contentToShow}</div>
      </Modal>
    </>
  );
};

function App() {
  const modalContent = { key: 'value' };

  return (
    <div>
      <ModalHolder contentToShow={modalContent} />
    </div>
  );
}

//SOLUTION
interface ModalHolderProps {
  contentToShow: JSX.Element;
}

const ModalHolder_withTS = ({ contentToShow }: ModalHolderProps) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}> Show Modal</button>

      <Modal isOpen={visibility}>
        <div>{contentToShow}</div>
      </Modal>
    </>
  );
};
