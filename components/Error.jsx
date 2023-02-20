import { useRouter } from 'next/router';

const Error = ({ message }) => {
  const { reload } = useRouter();

  return (
    <>
      <header>
        <div>
          <h1>Something went wrong!</h1>
          <p>{message}</p>
          <button onClick={() => reload()}>Refresh page</button>
        </div>
      </header>
      <style jsx>
        {`
          header {
            min-height: 70vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            text-align: center;
          }
          button {
            font-weight: 600;
            text-decoration: underline;
            transition: color 0.3s ease-in-out;
          }
          button:hover {
            color: var(--color-secondary);
          }
        `}
      </style>
    </>
  );
};

export default Error;
