import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { envs } from 'src/config/envs';
import { EmailInterface } from './interfaces';

@Injectable()
export class EmailsService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(envs.RESEND_API_KEY);
  }

  async sendEmail({ to, subject, html }: EmailInterface) {
    try {
      const response = await this.resend.emails.send({
        from: `trabajAI <${envs.RESEND_FROM_EMAIL}>`,
        to,
        subject,
        html,
      });
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BadRequestException('Failed to send email');
    }
  }

  async sendBatchEmails(emails: EmailInterface[]) {
    try {
      return await this.resend.batch.send(
        emails.map(({ to, subject, html }) => ({
          from: `trabajAI <${envs.RESEND_FROM_EMAIL}>`,
          to,
          subject,
          html,
        })),
      );
    } catch (error) {
      console.error('Error sending batch emails:', error);
      throw new BadRequestException('Failed to send batch emails');
    }
  }
}
