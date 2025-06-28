// import { Search } from '@gateway/controllers/auth/search';
import express, { Router } from 'express';

import { Search } from '@gateway/controllers/gig/search';
import { Get } from '@gateway/controllers/gig/get';

class SearchRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // this.router.get('/auth/search/gig/:from/:size/:type', Search.prototype.gigs);
    // this.router.get('/auth/search/gig/:gigId', Search.prototype.gigById);

    // this.router.get('/gig/search/gig/:from/:size/:type', Search.prototype.gigs);
    // this.router.get('/gig/search/:from/:size/:type', Search.prototype.gigs);

    this.router.get('/gig/search/:from/:size/:type', Search.prototype.gigs);

    this.router.get('/gig/:gigId',  Get.prototype.gigById);

    // this.router.get('/gis/search/gig/:gigId', Search.prototype.gigById);
    return this.router;
  }
}

export const searchRoutes: SearchRoutes = new SearchRoutes();
