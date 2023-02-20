import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const EditDeleteIcons = ({ id, isDefault, handleDelete, handleModal }) => {
  const iconBtns = (role) => (
    <button
      onClick={() => (role === 'edit' ? handleModal(id, isDefault) : handleDelete(id, isDefault))}
      aria-label={`${role} address`}>
      <FontAwesomeIcon icon={role === 'edit' ? faPen : faTrash} />
    </button>
  );

  return (
    <>
      <div>
        {iconBtns('edit')}
        {iconBtns('delete')}
      </div>
      <style jsx>{`
        div {
          margin: 0.3rem 0 1rem 1rem;
          display: flex;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
};

export default EditDeleteIcons;
