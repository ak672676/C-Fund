import { Link } from "../routes";

export default function Header() {
  return (
    <nav className="static bg-white w-full">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link route="/">
          <a className="font-bold text-2xl lg:text-4xl text-indigo-600">
            C-Fund
          </a>
        </Link>
        <div>
          <ul className="flex flex-row list-none">
            <li>
              <Link route="/">
                <a className="px-4 font-bold hover:text-gray-600">Home</a>
              </Link>
            </li>
            <li>
              <Link route="/pools">
                <a className="px-4 font-bold hover:text-gray-600">Pools</a>
              </Link>
            </li>
            <li>
              <Link route="/about">
                <a  className="px-4 font-bold hover:text-gray-600">
                  About
                </a>
              </Link>
            </li>
            <li>
              <a href="#" className="px-4 font-bold hover:text-gray-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
