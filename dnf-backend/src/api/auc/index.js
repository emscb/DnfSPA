import Router from 'koa-router';
import Auc from '../../models/auc';

const auc = new Router();

/*
GET /auc 최근 검색한 아이템 조회
POST /auc/:id 평균판매가 저장
GET /auc/:id 아이템 평균판매가 조회
*/

const recentSearch = (ctx) => {};

const avgSave = (ctx) => {};

const avgList = (ctx) => {};

auc.get('/', recentSearch);
auc.post('/:id', avgSave);
auc.get('/:id', avgList);

export default auc;
