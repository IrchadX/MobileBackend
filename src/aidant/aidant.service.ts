/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  //InternalServerErrorException,
  BadRequestException,
  //NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAidantDto } from './dto/create-aidant.dto';
import { PairAidantDto } from './dto/pair-aidant.dto';
import * as bcrypt from 'bcrypt';

function generateRandomIdentifier(length = 10): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');
}

@Injectable()
export class AidantService {
  constructor(private prisma: PrismaService) {}
  async signupAidant(dto: CreateAidantDto) {
    const { first_name, family_name, email, password, confirmPassword } = dto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const aidant = await this.prisma.user.create({
      data: {
        first_name,
        family_name,
        email,
        password: hashedPassword,
        userTypeId: 5,
        Identifier: generateRandomIdentifier(),
      },
    });

    return { message: 'Aidant user created', userId: aidant.id };
  }

  async pairWithAidant(dto: PairAidantDto) {
    try {
      console.log('Received DTO:', dto); // Log DTO for debugging

      const { user_id, aidant_identifier } = dto;

      // Fetch the aidant (helper) by identifier
      const aidant = await this.prisma.user.findFirst({
        where: {
          Identifier: aidant_identifier,
        },
      });

      if (!aidant) {
        throw new Error('Aidant not found');
      }

      // Check if the user has already paired with a helper (cannot pair with multiple helpers)
      const existingPairing = await this.prisma.helper_user.findFirst({
        where: {
          user_id: user_id,
          state: 'Pending',
        },
      });

      if (existingPairing) {
        throw new Error(
          'User has already sent a pairing request to another helper',
        );
      }

      // Create the helper_user entry linking the user and the aidant (helper)
      await this.prisma.helper_user.create({
        data: {
          user_id: user_id,
          helper_id: aidant.id,
          state: 'Pending',
        },
      });

      return { message: 'Pairing request sent successfully' };
    } catch (error) {
      console.error('Error in pairWithAidant:', error); // Log the full error
      throw new Error('An error occurred while processing the pairing request');
    }
  }
}
