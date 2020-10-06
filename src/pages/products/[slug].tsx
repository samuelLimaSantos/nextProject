import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

const Modal = dynamic(import('../../components/Modal'), {
  loading: () => <p>Loading...</p>,
});

const Products = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <button type="button" onClick={handleAddToCart}>
        Add to cart
      </button>
      {showModal && <Modal />}
    </div>
  );
};

export default Products;
