export class NoticeDto {
  user: string | number; // phone / email
  noticeType: string; // wasap //email
  template: string | number; //id or name
  text?: string; // what text to send
}
