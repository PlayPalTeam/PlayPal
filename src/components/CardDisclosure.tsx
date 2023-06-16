interface Props {
  title: string;
  element: JSX.Element[] | JSX.Element;
}

const CardDisclosure = ({ title, element }: Props) => {
  return (
    <div tabIndex={0} className="collapse-arrow  rounded-box collapse">
      <input type="checkbox" />
      <h2 className="collapse-title text-xl font-medium">{title}</h2>
      <div className="collapse-content">
        {Array.isArray(element) && element.length === 0 ? (
          <p className="text-center">No content available.</p>
        ) : (
          element
        )}
      </div>
    </div>
  );
};

export default CardDisclosure;
