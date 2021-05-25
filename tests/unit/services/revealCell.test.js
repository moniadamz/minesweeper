import sinon from "sinon";
import { expect } from "chai";

import * as service from "../../../src/services/revealCell";
import * as findService from "../../../src/services/findGame";
import * as domain from "../../../src/domain/board";
import Game from "../../../src/models/game";
describe("Service - reveal cell", () => {
  let updateStub;
  let execStub;
  let findStub;
  let domainStub;

  beforeEach(() => {
    domainStub = sinon.stub(domain, "revealCell");
    updateStub = sinon.stub(Game, "findOneAndUpdate");
    findStub = sinon.stub(findService, "findById");
    execStub = sinon.stub();
    updateStub.returns({
      exec: execStub,
    });
  });

  afterEach(() => {
    updateStub.restore();
    findStub.restore();
    domainStub.restore();
  });

  it("should find a game, update cell and return the updated data", async () => {
    const dbResult = { board: [], rows: 6, columns: 4 };
    domainStub.returns({ some: "data" });
    findStub.resolves(dbResult);
    execStub.resolves(dbResult);
    const response = await service.revealCell("123465", 4, 3);
    expect(execStub.callCount).to.eql(1);
    expect(updateStub.callCount).to.eql(1);
    expect(response).to.eql(dbResult);
  });

  it("should throw an error", async () => {
    const dbResult = { board: [], rows: 6, columns: 4 };
    domainStub.returns({ some: "data" });
    findStub.resolves(dbResult);
    execStub.rejects({ some: "error" });
    await service
      .revealCell("123465", 6, 2)
      .catch((e) => expect(e).to.eql({ some: "error" }));
  });

    it("should throw an error when param is invalid", async () => {
      const dbResult = { board: [], rows: 6, columns: 4 };
      domainStub.returns({ some: "data" });
      findStub.resolves(dbResult);
      await service
        .revealCell("123465", 6, 10)
        .catch((e) =>
          expect(e).to.eql({
            status: 400,
            message: "Column number exceeds the limit.",
          })
        );
    });
});
