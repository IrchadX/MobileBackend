import {
  Body,
  //Body,
  //Body,
  Controller,
  // Post,
  Get,
  //Patch,
  Param,
  //Delete,
  ParseIntPipe,
  Patch,
  //Post,
  //Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/ChangePasswordDto ';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('change-password')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(dto);
  }
}
