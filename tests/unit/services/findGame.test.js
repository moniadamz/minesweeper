import sinon from "sinon";
import { expect } from "chai";

import * as service from "../../../src/services/findGame";
import Game from "../../../src/models/game";
describe("Service - find game", () => {
  let findStub;
  let execStub;

  beforeEach(() => {
    findStub = sinon.stub(Game, "findById");
    execStub = sinon.stub();
    findStub.returns({
      exec: execStub,
    });
  });

  afterEach(() => {
    findStub.restore();
  });

  it("should find a game by id and return it", async () => {
    execStub.resolves({ board: [] });
    const response = await service.findById("123465");
    expect(execStub.callCount).to.eql(1);
    expect(response).to.eql({
      board: [],
    });
  });

  it("should not find a game and throw an error", async () => {
    execStub.resolves(null);
    await service
      .findById("123465")
      .catch((e) =>
        expect(e).to.eql({ status: 404, message: "not found!" })
      );
  });
});
