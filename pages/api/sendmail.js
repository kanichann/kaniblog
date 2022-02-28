const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


async function sendmail(req, res) {
    //　改行のエスケープシーケンスをbrタグに置換
    console.log(process.env.MAIL_USER);

    if (req.method !== 'POST') {
        return
    }
    const data = req.body;

    const { name, email, message } = data;

    const toHostMailData = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: name,
        text: `メールアドレス：${email}
お問い合わせ：
${message}`
    };

    const toGuestMailData = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'KaniBlogへのお問い合わせをありがとうございました。',
        text:
            `${name}様

KaniBlogへのお問い合わせをありがとうございました。
下記にて、お問い合わせ内容を承りました。
担当者より確認させていただきます。

ーーーーーーーーー
名前：${name}
メッセージ：${message}
ーーーーーーーーー

どうぞよろしくお願いいたします。
KaniBlog
`,
    };

    // 送信する
    async function sendmail() {
        try {
            const toHost = await sgMail.send(toHostMailData);
            const toGuest = await sgMail.send(toGuestMailData);
            res.status(201).json({ message: 'お問い合わせをありがとうございました。' })
        } catch (err) {
            res.status(400).json({
                message: `通信に失敗しました。
時間をおいて再度お問い合わせください。`})
        }
    } 
    sendmail()
    
};


export default sendmail;