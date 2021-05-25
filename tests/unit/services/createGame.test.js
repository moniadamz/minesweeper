import sinon from "sinon";
import { expect } from "chai";

import * as service from "../../../src/services/createGame";
import * as domain from "../../../src/domain/board";
import Game from "../../../src/models/game";
describe("Service - create game", () => {
  let sandbox;
  let domainStub;
  let saveStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    domainStub = sandbox.stub(domain, "generateGame");
    saveStub = sandbox.stub(Game.prototype, "save");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should receive parameters, persist a game and return it", async () => {
    const mockGame = { _id: "132", board: [] };
    saveStub.resolves(mockGame);
    await service.createGame(6, 4, 2);
    expect(domainStub.callCount).to.eql(1);
  });

    it("should throw an error if something goes wrong", async () => {
        const error = new Error("something");
        saveStub.rejects(error);
        domainStub.returns({ some: "data" });
        await service.createGame(6, 4, 2).catch(e => {
            expect(e).to.equal(error);
    })
  });
});
