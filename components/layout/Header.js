import Link from 'next/link';
import Image from 'next/image';
function Header() {

    return (<header className='fixed z-50 bg-white w-full top-0 left-0 px-8 sm:px-2
    py-3 flex justify-between' >
        <Link href='/'><a className='sm:w-24 hover:opacity-60 transition flex align-middle'><Image alt="kaniblog" src="/img/logo.svg" width={150} height={37} /></a></Link>
        <nav>
            <ul className='flex gap-x-6 sm:gap-x-2 items-center h-full text-sm'>
                <li> <Link href='/'><a className='hover:opacity-50 transition-all'>HOME</a></Link></li>
                <li> < Link href='/posts'><a className='hover:opacity-50 transition-all'>BLOG</a></Link></li>
                <li> < Link href='/soliloquy'><a className='hover:opacity-50 transition-all'>SOLILOQUY</a></Link></li>
                <li> <Link href='/contact'><a className='hover:opacity-50 transition-all'>CONTACT</a></Link></li>
            </ul>
        </nav>
    </header>
    )

}
export default Header;
