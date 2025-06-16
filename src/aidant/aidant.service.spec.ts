/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AidantService } from './aidant.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AidantService', () => {
  let service: AidantService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    helper_user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AidantService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AidantService>(AidantService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signupAidant', () => {
    const createAidantDto = {
      first_name: 'John',
      family_name: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    it('should throw BadRequestException if passwords do not match', async () => {
      const dto = { ...createAidantDto, confirmPassword: 'different' };
      await expect(service.signupAidant(dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if email already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 1 });
      await expect(service.signupAidant(createAidantDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should successfully create an aidant user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({ id: 1 });

      const result = await service.signupAidant(createAidantDto);
      expect(result).toEqual({ message: 'Aidant user created', userId: 1 });
      expect(mockPrismaService.user.create).toHaveBeenCalled();
    });
  });

  describe('pairWithAidant', () => {
    const pairAidantDto = {
      user_id: 1,
      aidant_identifier: 'ABC123',
    };

    it('should throw error if aidant not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      await expect(service.pairWithAidant(pairAidantDto)).rejects.toThrow(
        'Aidant not found',
      );
    });

    it('should throw error if user already has pending request', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({ id: 2 });
      mockPrismaService.helper_user.findFirst.mockResolvedValue({ id: 1 });
      await expect(service.pairWithAidant(pairAidantDto)).rejects.toThrow(
        'User has already sent a pairing request to another helper',
      );
    });

    it('should successfully create pairing request', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({ id: 2 });
      mockPrismaService.helper_user.findFirst.mockResolvedValue(null);
      mockPrismaService.helper_user.create.mockResolvedValue({ id: 1 });

      const result = await service.pairWithAidant(pairAidantDto);
      expect(result).toEqual({ message: 'Pairing request sent successfully' });
    });
  });

  describe('acceptPairingRequest', () => {
    it('should throw NotFoundException if pairing request not found', async () => {
      mockPrismaService.helper_user.findUnique.mockResolvedValue(null);
      await expect(service.acceptPairingRequest(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should successfully accept pairing request', async () => {
      const mockPairing = { id: 1, state: 'Pending' };
      mockPrismaService.helper_user.findUnique.mockResolvedValue(mockPairing);
      mockPrismaService.helper_user.update.mockResolvedValue({
        ...mockPairing,
        state: 'Accepted',
      });

      const result = await service.acceptPairingRequest(1);
      expect(result.message).toBe('Pairing request accepted');
      expect(result.data.state).toBe('Accepted');
    });
  });

  describe('declinePairingRequest', () => {
    it('should throw NotFoundException if pairing request not found', async () => {
      mockPrismaService.helper_user.findUnique.mockResolvedValue(null);
      await expect(service.declinePairingRequest(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should successfully decline pairing request', async () => {
      const mockPairing = { id: 1, state: 'Pending' };
      mockPrismaService.helper_user.findUnique.mockResolvedValue(mockPairing);
      mockPrismaService.helper_user.update.mockResolvedValue({
        ...mockPairing,
        state: 'Declined',
      });

      const result = await service.declinePairingRequest(1);
      expect(result.message).toBe('Pairing request declined');
      expect(result.data.state).toBe('Declined');
    });
  });

  describe('getPendingRequestsForHelper', () => {
    it('should throw BadRequestException if helper ID is invalid', async () => {
      await expect(
        service.getPendingRequestsForHelper('invalid'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return pending requests for helper', async () => {
      const mockRequests = [{ id: 1, state: 'Pending' }];
      mockPrismaService.helper_user.findMany.mockResolvedValue(mockRequests);

      const result = await service.getPendingRequestsForHelper('1');
      expect(result.message).toBe('Pending requests retrieved successfully');
      expect(result.data).toEqual(mockRequests);
    });
  });

  describe('getUsersForHelper', () => {
    it('should throw BadRequestException if helper ID is invalid', async () => {
      await expect(service.getUsersForHelper('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return accepted users for helper', async () => {
      const mockUsers = [{ id: 1, state: 'Accepted' }];
      mockPrismaService.helper_user.findMany.mockResolvedValue(mockUsers);

      const result = await service.getUsersForHelper('1');
      expect(result.message).toBe('Users retrieved successfully');
      expect(result.data).toEqual(mockUsers);
    });
  });
});
