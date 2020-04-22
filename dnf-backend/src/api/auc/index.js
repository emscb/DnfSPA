import Router from 'koa-router';
import Auc from '../../models/auc';
import Joi from 'joi';

const auc = new Router();

/*
GET /auc 최근 검색한 아이템 조회
POST /auc/:id 평균판매가 저장
GET /auc/:id 아이템 평균판매가 조회
*/

const recentSearch = (ctx) => {};

const avgSave = async (ctx) => {
  const schema = Joi.object().keys({
    date: Joi.date().required(),
    itemName: Joi.string().required(),
    itemId: Joi.string().required(),
    avgPrice: Joi.number().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { date, itemName, itemId, avgPrice } = ctx.request.body;
  const auc = new Auc({
    date,
    itemName,
    itemId,
    avgPrice,
  });
  try {
    await auc.save();
    ctx.body = auc;
  } catch (e) {
    ctx.throw(500, e);
  }
};

const avgList = (ctx) => {};

auc.get('/', recentSearch);
auc.post('/:id', avgSave);
auc.get('/:id', avgList);

export default auc;
