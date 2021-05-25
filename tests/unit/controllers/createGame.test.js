import sinon from 'sinon';
import { expect } from 'chai';

import createGame from '../../../src/controllers/createGame';
import * as service from "../../../src/services/createGame";
describe('Controller - create game', () => {
    let serviceStub;
    let req;
    let res;
    let nextStub;
    let statusStub;
    let jsonStub;

    beforeEach(() => {
        serviceStub = sinon.stub(service, 'createGame');
        jsonStub = sinon.stub();
        nextStub = sinon.stub();
        statusStub = sinon.stub();
        statusStub.returns({ json: jsonStub });
        res = { status: statusStub };
        req = {
            params: {
                rows: 5,
                columns: 6,
                minesQty: 2
            }
        };
    });

    afterEach(() => {
        serviceStub.restore();
    });

    it('should receive parameters and return status 201', async () => {
        serviceStub.resolves('123456');
        await createGame(req, res, nextStub);
        expect(nextStub.callCount).to.eql(0);
        expect(jsonStub.firstCall.args[0]).to.eql({
            gameId: '123456'
        });
        expect(statusStub.firstCall.args[0]).to.eql(201);
    });

    it("should catch an error and call next", async () => {
      serviceStub.rejects({ error: 'an error occured' });
      await createGame(req, res, nextStub);
        expect(nextStub.callCount).to.eql(1);
        expect(nextStub.firstCall.args[0]).to.eql({
          error: "an error occured",
        });
      expect(jsonStub.callCount).to.eql(0);
    });
});