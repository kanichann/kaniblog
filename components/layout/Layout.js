import { Fragment } from 'react'
import Header from './Header';
import Footer from './Footer';
function Layout(props){

    return (
        <Fragment>
            <Header />
            <main className='container mx-auto mt-16 sm:mt-12 pb-16'>
                {props.children}
            </main>
            <Footer/>
        </Fragment>
    )
}

export default Layout;