import { Controller, Post, Body } from '@nestjs/common';
import { AudioService } from './audio.service';
// Ajoutez cette importation pour Buffer
import { Buffer } from 'buffer';
@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('forward')
  async forwardAudio(@Body() body: { audio: string }): Promise<{ status: string }> {
    const audioBuffer = Buffer.from(body.audio, 'base64');
    await this.audioService.forwardAudio(audioBuffer);
    return { status: 'audio_forwarded_to_raspberry' };
  }
}