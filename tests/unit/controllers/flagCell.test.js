import sinon from "sinon";
import { expect } from "chai";

import flagCell from "../../../src/controllers/flagCell";
import * as service from "../../../src/services/flagCell";
describe("Controller - flag cell", () => {
  let serviceStub;
  let req;
  let res;
  let nextStub;
  let statusStub;
  let jsonStub;

  beforeEach(() => {
    serviceStub = sinon.stub(service, "flagCell");
    jsonStub = sinon.stub();
    nextStub = sinon.stub();
    statusStub = sinon.stub();
    statusStub.returns({ json: jsonStub });
    res = { status: statusStub };
    req = {
      params: {
        id: "123",
        },
        body: {
            row: 5,
            column: 6
        }
    };
  });

  afterEach(() => {
    serviceStub.restore();
  });

  it("should find a game, flag a cell and return the game updated with status 200", async () => {
    serviceStub.resolves({ board: [] });
    await flagCell(req, res, nextStub);
    expect(nextStub.callCount).to.eql(0);
    expect(jsonStub.firstCall.args[0]).to.eql({
      game: { board: [] },
    });
    expect(serviceStub.firstCall.args[0]).to.eql("123");
    expect(statusStub.firstCall.args[0]).to.eql(200);
  });

  it("should catch an error and call next", async () => {
    serviceStub.rejects({ error: "an error occured" });
    await flagCell(req, res, nextStub);
    expect(nextStub.callCount).to.eql(1);
    expect(nextStub.firstCall.args[0]).to.eql({
      error: "an error occured",
    });
    expect(jsonStub.callCount).to.eql(0);
  });
});
