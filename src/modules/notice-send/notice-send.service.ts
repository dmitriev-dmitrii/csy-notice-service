import { Injectable } from "@nestjs/common";
import { NoticeDto } from "./dto/notice.dto";
import { WhatsAppService } from "../bot-services/whats-app/whats-app.service";
import { BotType } from "../bot-services/types/BotType";

@Injectable()
export class NoticeSendService {
  constructor(private readonly WhatsAppService: WhatsAppService) {}
  sendNotice(noticeType, payload: NoticeDto) {
    if (noticeType === BotType.WHATS_APP) {
      return this.WhatsAppService.sendNotice(payload);
    }
  }
}
