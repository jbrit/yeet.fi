import assert from "assert";
import { 
  TestHelpers,
  YeetFinance_CurveInitialized
} from "generated";
const { MockDb, YeetFinance } = TestHelpers;

describe("YeetFinance contract CurveInitialized event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for YeetFinance contract CurveInitialized event
  const event = YeetFinance.CurveInitialized.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("YeetFinance_CurveInitialized is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await YeetFinance.CurveInitialized.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualYeetFinanceCurveInitialized = mockDbUpdated.entities.YeetFinance_CurveInitialized.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedYeetFinanceCurveInitialized: YeetFinance_CurveInitialized = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      dev: event.params.dev,
      token: event.params.token,
      name: event.params.name,
      symbol: event.params.symbol,
      description: event.params.description,
      image: event.params.image,
      twitter: event.params.twitter,
      telegram: event.params.telegram,
      website: event.params.website,
      kickoff: event.params.kickoff,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualYeetFinanceCurveInitialized, expectedYeetFinanceCurveInitialized, "Actual YeetFinanceCurveInitialized should be the same as the expectedYeetFinanceCurveInitialized");
  });
});
