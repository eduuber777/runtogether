const Footer = () => {
    return (
        <footer className="bg-dark text-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} RunTogether. Todos los derechos reservados.</p>
                <p className="text-sm text-gray-400 mt-2">PEC 3 - Desarrollo Frontend - UOC</p>
            </div>
        </footer>
    );
};

export default Footer;
