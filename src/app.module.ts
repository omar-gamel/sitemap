import { Module } from '@nestjs/common';
import { SitemapController } from './site-map.controller';

@Module({
  imports: [],
  controllers: [SitemapController],
  providers: []
})
export class AppModule {}
