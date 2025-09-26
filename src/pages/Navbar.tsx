import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">SpendWise</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="/" className="hover:text-blue-600 transition">
              Dashboard
            </a>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}
