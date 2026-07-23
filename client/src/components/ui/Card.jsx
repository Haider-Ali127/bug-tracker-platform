const Card = ({ children }) => {
  return (
    <div
      className="
      bg-[#161B22]
      rounded-2xl
      shadow-xl
      border
      border-gray-800
      p-8"
    >
      {children}
    </div>
  );
};

export default Card;