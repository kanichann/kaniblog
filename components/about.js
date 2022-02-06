import Image from "next/image";
import Link from "next/link";

function About(props) {
    return (
        <div className='flex justify-center gap-16 md:gap-x-8 sm:flex-col sm:gap-8 mt-24 pt-12 border-solid border-gray-300 border-t'>
            <div className='w-full'>
                <dl>
                    <dt className='title-sec3'>About</dt>
                    <dd>
                        <p className='mb-2'>ゆるくWEBのフロントを勉強中です。</p>
                        <ul>
                            <li><a href="" className='w-10 inline-block'><Image objectFit='contein' src='/sns/twitter.png' width={40} height={40} /></a></li>
                        </ul>
                    </dd>
                </dl>
            </div>
            <div className='w-full'>
                <dl>
                    <dt className='title-sec3'>TAG</dt>
                    <dd>
                        <ul className='flex gap-4 flex-wrap'>
                            {props.tags.map(tag => (<li key={tag} className='rounded-full border border-solid border-gray-300 bg-gray-100 px-3 text-gray-600 btn-bg'><Link href={`/tag/${tag}`}>{tag}</Link></li>))}
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
    )
}

export default About;