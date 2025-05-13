/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

   async signupUser(dto: CreateUserDto) {
      const { first_name, family_name, email, password, confirmPassword } = dto;
  
      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
  
      const existing = await this.prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new BadRequestException('Email already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await this.prisma.user.create({
        data: {
          first_name,
          family_name,
          email,
          password: hashedPassword,
          userTypeId: 14,
        },
      });
  
      return { message: ' user created', userId: user.id };
    }
  
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
      include: {
        userType: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      userTypeId: user.userTypeId,
    };

    const token = this.jwtService.sign(payload);

    console.log(`User ${user.email} logged in successfully.`);

    return {
      token: token,
      message: 'Authentification réussie',
      user: {
        id: user.id,
        firstName: user.first_name,
        familyName: user.family_name,
        email: user.email,
        phoneNumber: user.phone_number,
        userTypeId: user.userTypeId,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('✅ Token valid for user:', decoded);
      return {
        valid: true,
        user: decoded, // Return the entire decoded object like in Express
      };
    } catch (error) {
      console.error('❌ Token validation failed:', error.message);
      return {
        valid: false,
        error: 'Invalid or expired token',
      };
    }
  }
}
