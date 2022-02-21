import Link from "next/link";
import Image from "next/image";
function PostItem(props) {
    let { slug, title, image, date, excerpt} = props.post;
    image = `/img/posts/${image}`;
   
    return (
        <li className="w-full">
            <Link href={`/posts/${slug}`}>
                <a className="md:flex">
                    <div className="md:w-1/3 md:mr-3 border mb-4 border-gray-200 image-frame"><Image src={image} alt={excerpt} width={310} height={202} /></div>
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