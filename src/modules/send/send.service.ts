import { Injectable } from "@nestjs/common";
import { NoticeDto } from "./dto/notice.dto";

@Injectable()
export class SendService {
  sendNotice(data: NoticeDto) {
    console.log(data);
    return `This action returns all send`;
  }
}
