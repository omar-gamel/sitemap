import { Controller, Get, Response } from '@nestjs/common';
import { SitemapStream, streamToPromise } from 'sitemap';

@Controller()
export class SitemapController {
  sitemapXmlCache;
  sitemapTimeoutMs = 1000 * 60 * 60;
  @Get('sitemap')
  async sitemap(@Response() res) {
    res.set('Content-Type', 'text/xml');
    if (this.sitemapXmlCache) {
      res.send(this.sitemapXmlCache);
      return;
    }
    const products = [
      { id: 1, name: 'product1' },
      { id: 2, name: 'product2' }
    ];
    const smStream = new SitemapStream({
      hostname: process.env.HOST_NAME  
    });
    products.forEach(product => {
      smStream.write({
        url: `/product/${product.id}`,
        changefreq: 'monthly',
        priority: 1
      });
    });
    smStream.write({
      url: '/',
      changefreq: 'daily',
      priority: 1
    });
    smStream.write({
      url: '/about',
      priority: 0.9
    });
    smStream.end();
    // streamToPromise(smStream).then(xml => {
    //   res.send(xml);
    // });
    streamToPromise(smStream).then(xml => {
      this.sitemapXmlCache = xml;
      setTimeout(() => {
        this.sitemapXmlCache = null;
      }, this.sitemapTimeoutMs);
      res.send(xml);
    });
  }
}
