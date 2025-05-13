/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // User update endpoint
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      console.log('Update Data:', updateUserDto);

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          first_name: updateUserDto.firstName ?? existingUser.first_name,
          family_name: updateUserDto.familyName ?? existingUser.family_name,
          email: updateUserDto.email ?? existingUser.email,
          phone_number: updateUserDto.phoneNumber ?? existingUser.phone_number,
          birth_date: updateUserDto.birthDate ?? existingUser.birth_date,
          sex: updateUserDto.sex ?? existingUser.sex,
          city: updateUserDto.city ?? existingUser.city,
          street: updateUserDto.street ?? existingUser.street,
          userTypeId: updateUserDto.userTypeId ?? existingUser.userTypeId,
        },
      });

      console.log('Updated User:', updatedUser);

      const { password, birth_date, ...result } = updatedUser;
      return {
        ...result,
        birthDate: birth_date ? birth_date.toISOString().split('T')[0] : null,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        'Failed to update user: ' + error.message,
      );
    }
  }

  // User deletion endpoint
  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.prisma.user.delete({ where: { id } });

      return { message: `User with ID ${id} successfully deleted` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException(
        'Failed to delete user: ' + error.message,
      );
    }
  }

  // User by ID fetching endpoint
  async findOne(id: number) {
    try {
      console.log(`Fetching user with ID: ${id}`);

      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          userType: true,
        },
      });

      // Log the user data if found
      if (user) {
        console.log(`User found:`, user); // Log the full user object
      } else {
        console.log(`User with ID ${id} not found`); // Log when no user is found
      }

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Destructure and format response
      const { password, birth_date, userType, ...result } = user;

      // Log the formatted result
      console.log(`Formatted user data:`, {
        ...result,
        userType: userType?.type ?? null,
        birthDate: birth_date ? birth_date.toISOString().split('T')[0] : null,
      });

      return {
        ...result,
        userType: userType?.type ?? null,
        birthDate: birth_date ? birth_date.toISOString().split('T')[0] : null,
      };
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }
}
