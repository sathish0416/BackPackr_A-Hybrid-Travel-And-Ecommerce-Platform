import nodemailer from 'nodemailer';

const createEmailTransporter = () => {
  // For development, use ethereal email (test email service)
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTestAccount().then(testAccount => {
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    });
  }

  // For production, use real email service
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendPasswordResetEmail = async (userEmail, resetToken, userType = 'user') => {
  try {
    const transporter = await createEmailTransporter();
    
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}&type=${userType}`;
    
    const mailOptions = {
      from: `"Backpackr" <${process.env.EMAIL_FROM || 'noreply@backpackr.com'}>`,
      to: userEmail,
      subject: 'Password Reset Request - Backpackr',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; font-size: 24px;">🎒 Backpackr</h1>
            <p style="color: #6b7280; font-size: 16px;">Your Travel Companion</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">Password Reset Request</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Hi there! We received a request to reset your password for your Backpackr account. 
              Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; 
                        border-radius: 6px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              Or copy and paste this link into your browser:<br>
              <span style="word-break: break-all; color: #3b82f6;">${resetUrl}</span>
            </p>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="color: #92400e; font-size: 14px; margin: 0;">
              <strong>Important:</strong> This link will expire in 15 minutes for security reasons. 
              If you didn't request this password reset, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px;">
            <p>© ${new Date().getFullYear()} Backpackr. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email sent! Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
};

export const sendPasswordResetConfirmationEmail = async (userEmail, userType = 'user') => {
  try {
    const transporter = await createEmailTransporter();
    
    const mailOptions = {
      from: `"Backpackr" <${process.env.EMAIL_FROM || 'noreply@backpackr.com'}>`,
      to: userEmail,
      subject: 'Password Successfully Reset - Backpackr',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; font-size: 24px;">🎒 Backpackr</h1>
            <p style="color: #6b7280; font-size: 16px;">Your Travel Companion</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #166534; font-size: 20px; margin-bottom: 15px;">Password Reset Successful!</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Great news! Your password has been successfully reset for your Backpackr account. 
              You can now sign in with your new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/login/${userType}" 
                 style="background: #16a34a; color: white; padding: 12px 30px; text-decoration: none; 
                        border-radius: 6px; font-weight: bold; display: inline-block;">
                Sign In Now
              </a>
            </div>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <strong>Security Tip:</strong> If you didn't reset your password, please contact our 
              support team immediately at support@backpackr.com.
            </p>
          </div>
          
          <div style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px;">
            <p>© ${new Date().getFullYear()} Backpackr. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Confirmation email sent! Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};
