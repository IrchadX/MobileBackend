import { Body, Controller, Post } from '@nestjs/common';
import { AidantService } from './aidant.service';
import { CreateAidantDto } from './dto/create-aidant.dto';
import { PairAidantDto } from './dto/pair-aidant.dto';

@Controller('aidant')
export class AidantController {
  constructor(private readonly aidantService: AidantService) {}

  @Post('signup')
  async signupAidant(@Body() dto: CreateAidantDto) {
    return this.aidantService.signupAidant(dto);
  }

  @Post('pair')
  pairWithAidant(@Body() dto: PairAidantDto) {
    console.log('DTO received:', dto);
    return this.aidantService.pairWithAidant(dto);
  }
}
