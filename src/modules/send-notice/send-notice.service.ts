import { Injectable } from "@nestjs/common";
import { NoticeDto } from "./dto/notice.dto";
import { WhatsAppService } from "../senders-services/whats-app/whats-app.service";

@Injectable()
export class SendNoticeService {
  constructor(private readonly WhatsAppService: WhatsAppService) {}
  sendNotice(data: NoticeDto) {
    // if (data.noticeType === "whatsapp") {
    return this.WhatsAppService.sendNotice(data);
    // }
    // return `This action returns all send`;
  }
}
