import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SendNoticeService } from "./send-notice.service";
import { NoticeDto } from "./dto/notice.dto";

@Controller("send")
export class SendNoticeController {
  constructor(private readonly sendService: SendNoticeService) {}

  @Post()
  sendNotice(@Body() data: NoticeDto) {
    return this.sendService.sendNotice(data);
  }

  // @Get()
  // findAll() {
  //   return this.sendService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sendService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSendDto: UpdateSendDto) {
  //   return this.sendService.update(+id, updateSendDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sendService.remove(+id);
  // }
}
