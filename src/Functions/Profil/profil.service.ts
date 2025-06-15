/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt'; 

type ProfilData = {
  fullName: string;
};
type ProfilError= {
  error: string;
};
type Response={
  data: string;
};
@Injectable()
export class ProfilService {
  constructor(private readonly prisma: PrismaService) {}

  // Function to get User informations
  async getUserData(userId: string): Promise<ProfilData | ProfilError | null> {
    try {
      if (!/^\d+$/.test(userId)) {
        return{ error: 'Invalid ID format'};
      }
      const data = await this.prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
        select: { family_name: true, first_name: true },
      });

      if (!data) {
        console.error('Data user not found for user_id:', userId);
        return null;
      }
    
      // Return structured JSON response
      return {
        fullName: `${data.first_name} ${data.family_name}`.trim()
      };
    } catch (error) {
      console.error('Error in getUserData:', error);
      return null;
    }
  }
  // Function to Change User informations
  async changeUserData(userId: string, first: string, last: string): Promise<string | null> {
    try {
      console.log(first)
      if (!/^\d+$/.test(userId)) {
        return 'Invalid ID format';
      }
  
      const updatedUser = await this.prisma.user.update({
        where: {
          id: parseInt(userId, 10), 
        },
        data: {
          first_name: first,
          family_name: last,
        },
        select: { 
          id: true,
          first_name: true,
          family_name: true
      }
      });
      console.log('Updated user:', updatedUser);
    // Verify update
    const verifiedUser = await this.prisma.user.findUnique({
        where: { id: parseInt(userId, 10),  }
    });

    if (verifiedUser?.first_name !== first || verifiedUser?.family_name !== last) {
        throw new Error('Update verification failed');
    }
  
      // Return a message confirming the update
      return `Opération Réussie`;
    } catch (error) {
      console.error('Error updating user data:', error);
      return null; 
    }
  }
  // Function to Change User password
  async changeUserPassword(userId: string, pwd: string): Promise<string | null> {
    try {
      // Validate user ID
      if (!/^\d+$/.test(userId)) {
        return 'Invalid ID format';
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(pwd, 10); // 10 is the saltRounds for bcrypt
  
      // Update user with hashed password
      await this.prisma.user.update({
        where: {
          id: parseInt(userId, 10), // User ID should be an integer
        },
        data: {
          password: hashedPassword, // Save the hashed password
        },
      });
  
      // Return a success message
      return  `Opération Réussie`;
    } catch (error) {
      console.error('Error updating user password:', error);
      return "Erreur Réseau , veuillez reessayer plus tard"; 
    }
  }
  // Function to Check the User password

  async checkUserPassword(userId: string, pwd: string): Promise<string| null> {
    try {
      if (!/^\d+$/.test(userId)) {
        return 'Invalid ID format' ;
      }
  
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId, 10),
        },
      });
  
      if (!user) {
        return 'User not found' ;
      }
      if (user.password) {
        const passwordMatch = await bcrypt.compare(pwd, user.password); 
  
        if (passwordMatch) {
          return  'true' ;
        } else {
          return 'Mot de passe incorrect!' ;
        }
      }else{
        return 'User does not have password' ;
      }
     
    } catch (error) {
      console.error('Error checking user password:', error);
      return 'Erreur Réseau' ;
    }
  }
  
  
}
