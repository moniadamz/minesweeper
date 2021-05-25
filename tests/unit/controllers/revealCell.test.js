import sinon from "sinon";
import { expect } from "chai";

import revealCell from "../../../src/controllers/revealCell";
import * as service from "../../../src/services/revealCell";
describe("Controller - reveal cell", () => {
  let serviceStub;
  let req;
  let res;
  let nextStub;
  let statusStub;
  let jsonStub;

  beforeEach(() => {
    serviceStub = sinon.stub(service, "revealCell");
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
        column: 6,
      },
    };
  });

  afterEach(() => {
    serviceStub.restore();
  });

  it("should find a game, reveal a cell and return the game updated with status 200", async () => {
    serviceStub.resolves({ board: [] });
    await revealCell(req, res, nextStub);
    expect(nextStub.callCount).to.eql(0);
    expect(jsonStub.firstCall.args[0]).to.eql({
      game: { board: [] },
    });
    expect(serviceStub.firstCall.args[0]).to.eql("123");
    expect(statusStub.firstCall.args[0]).to.eql(200);
  });

  it("should catch an error and call next", async () => {
    serviceStub.rejects({ error: "an error occured" });
    await revealCell(req, res, nextStub);
    expect(nextStub.callCount).to.eql(1);
    expect(nextStub.firstCall.args[0]).to.eql({
      error: "an error occured",
    });
    expect(jsonStub.callCount).to.eql(0);
  });
});
