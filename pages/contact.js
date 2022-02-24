import { useState,useRef,Fragment } from "react"
import Head from "next/head"
import { getTags } from "../lib/js/posts-util"
import About from "../components/about"


async function sendMail(name, email, message) {
  const response = await fetch('/api/sendmail',{
    method:'POST',
    body:JSON.stringify({name,email,message}),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const data = await response.json();
  const receiveMessage = data.message || '接続に問題がありました。お時間をおいて再度お問い合わせください。'
  console.log(response.ok);
  return { message:receiveMessage,respnse:response.ok  }
}


export default function Home(props) {
  const [sending, setSending] = useState(false);
  const [receiveResponse, setReceiveResponse] = useState('')
  const [ name, nameHandler ] = useState('');
  const [ email, emailHandler ] = useState('');
  const [ message, messageHandler ] = useState('');

  const [ nameTouch, nameTouthHandler ] = useState(false);
  const [ emailTouch, emailTouthHandler ] = useState(false);
  const [ messageTouch, messageTouchHandler ] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();
    setSending(true);
    let result = await sendMail(name, email, message);
    setReceiveResponse(result);
    setSending(false);
  } 
  let nameInput = 'input border-gray-400 block w-2/3 mt-2 md:w-full'
  if (nameTouch) {
    nameInput ='input block w-2/3 mt-2 md:w-full border-red-600 '
  }
  if (nameTouch && name !== '') {
    nameInput ='input block w-2/3 mt-2 md:w-full border-green-400 '
  }
  let mailInput = 'input border-gray-400 block w-2/3 mt-2 md:w-full'
  if (emailTouch && !email.includes('@') ) {
    mailInput ='input block w-2/3 mt-2 md:w-full border-red-600 '
  }
  if (emailTouch && email.includes('@') ) {
    mailInput ='input block w-2/3 mt-2 md:w-full border-green-400 '
  }

  let textInput = "input border-gray-400 block w-full h-40";
  if (messageTouch && name === '') {
    textInput ='input block w-full h-40 border-red-600 '
  }
  if (messageTouch && message !== '') {
    textInput ='input block w-full h-40 border-green-400 '
  }

  let btn = "btn-contact border-stone-300 bg-stone-300 pointer-events-none"
  if ( name !== ''&&(emailTouch && email.includes('@'))&&message !== '' ) {
    btn = "btn-contact border-orange-300 bg-transparent"
  }
  return (
  <Fragment>
        <Head>
          <title>KaniBlog</title>
          <meta name='description' content='WEB関係のお仕事をしております。日々の学習について気ままに発信します。' />
        </Head>
            <article>       
        <h1 className="title-sec1">お問い合わせ</h1>   
        <p className="pb-4 mb-8 border-b border-solid border-gray-300">感想からご質問まで気軽にご連絡ください。</p>
        <div className="px-12 md:px-0">
          <form onSubmit={sendMessage}>
              <div className="mb-6">
              <label htmlFor="name">お名前 <span className="text-red-600">*</span></label>
              <input className={nameInput} type="text" required id="name" name="name" onChange={(e)=>{nameHandler(e.target.value)}} onBlur={()=>{nameTouthHandler(true)}} />
              {nameTouch && name==='' && <p className="text-red-600">入力は必須です。</p>}
              </div>
              <div className="mb-6">
              <label className="block"  htmlFor="email">メールアドレス <span className="text-red-600">*</span></label>
              <input className={mailInput} type="email" required id="email" name="email" onChange={(e)=>{emailHandler(e.target.value)}} onBlur={()=>{emailTouthHandler(true)}} />
              {(emailTouch && email==='' && <p className="text-red-600">入力は必須です。</p>)||(emailTouch && email.includes('＠') && <p className="text-red-600">@を半角で記入してください。</p>)||(emailTouch && !email.includes('@') && <p className="text-red-600">メールアドレスを入力してください。</p>)}
              </div>
              <div className="mb-6">
              <label className="block"  htmlFor="message">メッセージ <span className="text-red-600">*</span></label>
              <textarea onChange={(e)=>{messageHandler(e.target.value)}} onBlur={()=>{messageTouchHandler(true)}}  className={textInput}  type="text" required id="message" name="message" >
              </textarea>
              {messageTouch && message==='' && <p className="text-red-600">入力は必須です。</p>}
              </div>
              <button className={btn} type="submit" >送信</button>
          </form>
          {sending && (<div className="flex justify-center"><div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>)}
          {receiveResponse.message !== '' && receiveResponse.respnse &&<p className="mt-2 text-orange-500 text-lg">{receiveResponse.message}</p>   }
          {receiveResponse.message !== '' && !receiveResponse.respnse &&<p className="mt-2 text-red-600 text-lg">{receiveResponse.message}</p>   }
                </div>
                
                <About tags={props.tags}/>
        </article>
      </Fragment>
     
    )
}
  

export function getStaticProps() {
    const tags = getTags();
    return {
      props: {
        tags: tags
      },
      // revalidate:60
    }
  }