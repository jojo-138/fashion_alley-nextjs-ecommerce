import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Network = () => {
  return (
    <>
      <div>
        <p>
          <span>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </span>
          You seem to be offline. Data might not be up to date and some features will not be
          available.
        </p>
      </div>
      <style jsx>
        {`
          div {
            background-color: #ffcc66;
            padding-block: 1px;
          }
          p {
            max-width: 1165px;
            margin-inline: auto;
            padding-inline: 0.7rem;
            font-size: 0.9rem;
            color: #000000;
            line-height: 1.3rem;
          }
          span {
            margin-right: 0.5rem;
            color: #37383a;
          }
        `}
      </style>
    </>
  );
};

export default Network;
