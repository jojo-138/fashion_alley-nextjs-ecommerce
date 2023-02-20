const AddressFormat = ({ address }) => {
  const { street, unit, city, state, zip_code: zipCode, country } = address;

  return (
    <>
      <div>
        <p>{street}</p>
        {unit !== 'none' && <p>{unit}</p>}
        <p>{`${city}, ${state} ${zipCode}`}</p>
        <p>{country}</p>
      </div>
      <style jsx>{`
        p {
          margin: 0;
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default AddressFormat;
