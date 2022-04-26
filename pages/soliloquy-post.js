import { useState, useRef, Fragment } from "react"
import { useRouter } from 'next/router'
import Head from "next/head"
import { getTags } from "../lib/js/posts-util"
import About from "../components/about"


async function send(message) {
  console.log(message);
  const response = await fetch('/api/soliloquy', {
    method: 'POST',
    body: JSON.stringify({ message: message }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response;
  console.log(data);

  return data
}


export default function Home(props) {
  const router = useRouter();

  const [message, messageHandler] = useState('');
  const [messageTouch, messageTouchHandler] = useState(false);
  const [sending, setSending] = useState(false);
  async function sendMessage(event) {
    event.preventDefault();
    setSending(true);
    let result = await send(message);

    setSending(false);
    if (result) {
      console.log("iketa")
      router.push('/soliloquy');

    }

  }

  let textInput = "input border-gray-400 block w-full ";
  if (messageTouch && message !== '') {
    textInput = 'input block w-full border-green-400 '
  }

  let btn = "btn-contact border-stone-300 bg-stone-300 pointer-events-none"
  if (message !== '') {
    btn = "btn-contact border-orange-300 bg-transparent"
  }
  return (
    <Fragment>
      <Head>
        <title>KaniBlog | ひとりごと投稿</title>
        <meta name='description' content='WEB関係のお仕事をしております。日々の学習について気ままに発信します。' />
      </Head>
      <article>
        <h1 className="title-sec1">ひとりごと投稿</h1>
        <p className="pb-4 mb-8 border-b border-solid border-gray-300">ひとりごとをかきこんでください。</p>
        <div className="px-12 md:px-0">

          <form onSubmit={sendMessage}>
            <div className="mb-6">
              <label htmlFor="message">こちらにどうぞ</label>
              <input className={textInput} type="text" required id="message" name="message" onChange={(e) => { messageHandler(e.target.value) }} onBlur={() => { messageTouchHandler(true) }} />
            </div>
            <button className={btn} type="submit" >投稿</button>
          </form>
          {sending && (<div className="flex justify-center"><div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>)}

        </div>
        <About tags={props.tags} />

      </article>
    </Fragment>
  )
}



export function getStaticProps() {
  const tags = getTags();
  return {
    props: {
      tags: tags
    }
  }
}