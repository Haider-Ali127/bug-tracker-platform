const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 rounded-xl font-semibold
      bg-gradient-to-r from-purple-600 to-cyan-500
      hover:scale-105
      hover:shadow-lg
      hover:shadow-cyan-500/20
      transition-all duration-300
      text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;