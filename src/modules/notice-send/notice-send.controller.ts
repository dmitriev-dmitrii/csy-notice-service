import {
  Controller,
  Post,
  Body,
  Param,
  ParseEnumPipe,
  NotFoundException,
} from "@nestjs/common";
import { NoticeSendService } from "./notice-send.service";
import { NoticeDto } from "./dto/notice.dto";
import { BotType } from "../bot-services/types/BotType";

const BotTypeControllerErr = () => {
  return new NotFoundException();
};

@Controller("send")
export class NoticeSendController {
  constructor(private readonly SendNoticeService: NoticeSendService) {}
  @Post(":botType")
  sendNotice(
    @Param(
      "botType",
      new ParseEnumPipe(BotType, {
        exceptionFactory: BotTypeControllerErr,
      })
    )
    botType: BotType,
    @Body() payload: NoticeDto
  ) {
    return this.SendNoticeService.sendNotice(botType, payload);
  }
}
