import Dropdown from '../Dropdown';

const ProductDropDown = ({ name, content }) => {
  if (typeof content === 'string') content = content.split(', ');

  return (
    <>
      <Dropdown
        name={name}
        parent='productView'>
        <ul>
          {content.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Dropdown>
      <style jsx>
        {`
          ul {
            font-size: 0.9rem;
          }
        `}
      </style>
    </>
  );
};

export default ProductDropDown;
