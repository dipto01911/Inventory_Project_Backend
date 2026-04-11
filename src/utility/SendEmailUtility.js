const nodemailer=require('nodemailer')

const EmailSend = async (Emailto, EmailText, EmailSubject) => {
  try {
   
    let transport = nodemailer.createTransport({
      host: 'mail.teamrabbil.com',
      port: 587,            
      secure: false,        
      auth: {
        user: "info@teamrabbil.com", 
        pass: '~sR4[bhaC[Qs'         
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

   
    await transport.verify();
    console.log("SMTP server is ready to send messages");

  
    let mailOptions = {
      from: '"Team Rabbil" <info@teamrabbil.com>',
      to: Emailto,
      subject: EmailSubject,
      text: EmailText,
     
    };
   return await transport.sendMail(mailOptions);
    } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {EmailSend};

  