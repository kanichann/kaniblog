import Document,{Html,Head,Main,NextScript} from 'next/document';

class MyDocument extends Document{
	render(){
		return (
			<Html lang='ja' className='h-full'>
				<Head/>
				<body className='min-h-full flex flex-col'>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		)
	}
}

export default MyDocument