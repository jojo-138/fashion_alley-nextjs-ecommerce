import Invoice from './Invoice';

const OrderHistory = ({ invoices }) => {
  return (
    <>
      <div>
        <h2>Order History</h2>
        {!invoices.length ? (
          <p>No available order history. Start Ordering!</p>
        ) : (
          invoices.map((invoice, i) => (
            <Invoice
              invoice={invoice}
              key={i}
            />
          ))
        )}
      </div>
      <style jsx>
        {`
          div {
            margin-bottom: 2.5rem;
            width: 70%;
          }
          h2 {
            text-align: center;
          }
          p {
            text-align: center;
          }
          @media (max-width: 1130px) {
            div {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default OrderHistory;
