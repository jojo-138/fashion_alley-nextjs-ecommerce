import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CloseIcon = ({ handleClick, position }) => {
  const styles = position === 'left' && {
    marginRight: '1rem',
    alignSelf: 'flex-end',
  };

  return (
    <FontAwesomeIcon
      aria-label='Close'
      icon={faXmark}
      onClick={handleClick}
      style={{
        fontSize: '1.3rem',
        cursor: 'pointer',
        ...styles,
      }}
    />
  );
};

export default CloseIcon;
