import { Injectable } from '@nestjs/common';
import { NoticeDto } from "./dto/notice.dto";

@Injectable()
export class SendService {
  sendNotice(notice : NoticeDto) {

    return `This action returns all send`;
  }
}
