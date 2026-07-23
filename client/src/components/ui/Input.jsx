const Input = ({
    type = "text",
    placeholder,
    name,
    value,
    onChange,
    children,
}) => {

    if (type === "select") {
        return (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="
    w-full
    px-4
    py-3
    rounded-xl
    bg-[#0D1117]
    border
    border-gray-700
    text-white
    appearance-none
    focus:outline-none
    focus:border-purple-500
    focus:ring-2
    focus:ring-purple-500/30
    transition-all"
            >
                {children}
            </select>
        );
    }

    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#0D1117]
        border
        border-gray-700
        text-white
        placeholder-gray-400
        focus:outline-none
        focus:border-purple-500
        focus:ring-2
        focus:ring-purple-500/30
        transition-all"
        />
    );
};

export default Input;