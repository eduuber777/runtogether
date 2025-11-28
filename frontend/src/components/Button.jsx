const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-dark",
        secondary: "bg-secondary text-dark hover:bg-cyan-400",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        danger: "bg-red-500 text-white hover:bg-red-600"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
