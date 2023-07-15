import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { WhatsAppService } from "../senders-services/whats-app/whats-app.service";
@Controller("message-recipient")
export class MessageRecipientController {
  constructor(private readonly WhatsAppService: WhatsAppService) {}

  @Post("whats-app")
  onWhatsAppMessage(@Body() payload) {
    return this.WhatsAppService.onMessage(payload);
  }

  // @Get("webhook")
  // abc(req) {
  //   console.log(req);
  //   console.log("ffff");
  //   return "dffffx";
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
