

export default function Footer() {

    return (
        <footer className="w-full max-w-6xl mt-16 py-6 border-t-2 border-sky-700/50 text-center">
            <p className="text-sm text-slate-500 hover:text-sky-400 transition-colors">
                &copy; {new Date().getFullYear()} Made by NhatDinh <span className="text-sky-500">♥</span>
            </p>
        </footer>
    )
}