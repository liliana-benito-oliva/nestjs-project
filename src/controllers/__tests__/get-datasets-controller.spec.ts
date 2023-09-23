import { Test, TestingModule } from "@nestjs/testing";
import { GetDatasetsService } from "../../services";
import { GetDatasetsController } from "..";
import {
  AVERAGE_MOCK,
  MEDIAN_MOCK,
  TOP_SALARIES_MOCK,
} from "./mocks/get-dataset-mocks";

describe("GetDatasetsController", () => {
  let appController: GetDatasetsController;
  let appService: GetDatasetsService;

  beforeEach(async () => {
    /* const app: TestingModule = await Test.createTestingModule({
      controllers: [GetDatasetsController],
      providers: [{
        provide: appService,
      }],
    }).compile(); */

    appService = new GetDatasetsService();
    appController = new GetDatasetsController(appService);
  });

  describe("get-datasets", () => {
    it("should return error if no methods are selected", () => {
      const result = appController.getDatasets({ methods: [] });
      expect(result.code).toBe(400);
    });

    it("Should return OK when called with average", () => {
      jest
        .spyOn(appService, "getAverage")
        .mockImplementation(() => AVERAGE_MOCK);
      const result = appController.getDatasets({ methods: ["get-average"] });
      expect(result.code).toEqual(200);
      expect(result.body).toEqual(AVERAGE_MOCK);
    });

    it("Should return OK when called with median", () => {
      jest
        .spyOn(appService, "getMedianSalary")
        .mockImplementation(() => MEDIAN_MOCK);
      const result = appController.getDatasets({ methods: ["get-median"] });
      expect(result.code).toEqual(200);
      expect(result.body).toEqual(MEDIAN_MOCK);
    });

    it("Should return OK when called with TopSalaries", () => {
      jest
        .spyOn(appService, "getTopNSalaries")
        .mockImplementation(() => TOP_SALARIES_MOCK);
      const result = appController.getDatasets({
        methods: ["get-top-salaires"],
      });
      expect(result.code).toEqual(200);
      expect(result.body).toEqual(TOP_SALARIES_MOCK);
    });

    it("Should return OK, when called with multiple methods", () => {
      jest
        .spyOn(appService, "getAverage")
        .mockImplementation(() => AVERAGE_MOCK);
      jest
        .spyOn(appService, "getMedianSalary")
        .mockImplementation(() => MEDIAN_MOCK);
      jest
        .spyOn(appService, "getTopNSalaries")
        .mockImplementation(() => TOP_SALARIES_MOCK);
      const result = appController.getDatasets({
        methods: ["get-top-salaires", "get-average", "get-median"],
      });
      expect(result.code).toEqual(200);
      expect(result.body).toEqual({
        ...MEDIAN_MOCK,
        ...AVERAGE_MOCK,
        ...TOP_SALARIES_MOCK,
      });
    });
  });
});
