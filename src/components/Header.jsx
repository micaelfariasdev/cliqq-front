import { FaPlus } from "react-icons/fa";

function Header() {
  return (
    <header className=" text-black p-4 border-2 border-gray-200 flex flex-row justify-between items-center bg-white">
      <h1 className="text-2xl font-bold">Cliqq</h1>
      <div className='flex justify-end items-center mt-4 gap-2'>
        <input className='border-2 border-gray-500 rounded-2xl pl-3' type="text" name="search" id="isearch" placeholder='Procurar' />
        <img className='h-5 rounded-full border-1 border-gray-500 ' src="https://th.bing.com/th/id/OIP.iGXXTQ2_jBkxPfeH-_jRJQHaHa?rs=1&pid=ImgDetMain" alt="" />
        <button className='bg-blue-500 h-6 w-6 rounded-full  flex flex-wrap justify-center flex-col content-center' type="button"><FaPlus className='text-white' /></button>
      </div>
    </header>
  );
}
export default Header;