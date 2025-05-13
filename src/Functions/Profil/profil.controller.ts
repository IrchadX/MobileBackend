/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
// src/example/example.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfilService } from './profil.service';

import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;
  @IsString()
  firstName: string;
  
  @IsString()
  lastName: string;
}
export class UpdateUserpwd {
  @IsString()
  id: string;
  @IsString()
  pwd: string;
}
@Controller('')
export class ProfilController {
  constructor(private readonly exampleService: ProfilService) {}

  @Get('api/getDataProfil/:id') // Accepts 'id' as a parameter
  async getData(@Param('id') userId: string) {
    const name = await this.exampleService.getUserData(userId);
    return name;
  }
  @Post('api/changeDataProfil') 
async changeDataUser(
  @Body() updateUserDto: UpdateUserDto
) {
  const id = updateUserDto.id;
  const first = updateUserDto.firstName; 
  const last = updateUserDto.lastName;
  
  const message = await this.exampleService.changeUserData(id, first, last);
  return {data: message};
}
@Post('api/changePassword') 
async changePasswordUser(
  @Body() pwdRequest: UpdateUserpwd,
) {
  const {id, pwd} = pwdRequest;
  const message = await this.exampleService.changeUserPassword(id, pwd);
  return {data: message};
}
@Post('api/checkPassword') 
async checkPasswordUser(
  @Body() pwdRequest: UpdateUserpwd,
) {
  const {id, pwd} = pwdRequest;
  const message = await this.exampleService.checkUserPassword(id, pwd);
  return {data: message};
}


}