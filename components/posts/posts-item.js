import Link from "next/link";
import Image from "next/image";
function PostItem(props) {
    let { slug, title, image, date } = props.post;
    image = `/img/posts/${image}`;
   
    return (
        <li className="w-full">
            <Link href={`/posts/${slug}`}>
                <a className="md:flex">
                    {/* <Image src={image} layout="fill" objectFit="contain"/> */}
                    <div className="md:w-1/3 md:mr-3 border border-gray-200 align-top posts-item"><Image src={image} width={300} height={200} /></div>
                    <div>
                    <time>{date}</time>
                    <p>{title}</p>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default PostItem;