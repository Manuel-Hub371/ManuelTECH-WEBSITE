import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  validateAdmin(email: string, password: string): boolean {
    const adminEmail = this.config.get<string>('ADMIN_EMAIL', 'admin@manueltech.com');
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD', 'admin123');
    return email === adminEmail && password === adminPassword;
  }

  login(email: string, password: string) {
    if (!this.validateAdmin(email, password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: 'admin', email, role: 'admin' };
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: '8h',
    };
  }
}
