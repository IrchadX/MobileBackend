import {
  //Body,
  //Body,
  Controller,
  // Post,
  Get,
  //Patch,
  Param,
  //Delete,
  ParseIntPipe,
  //Post,
  //Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
