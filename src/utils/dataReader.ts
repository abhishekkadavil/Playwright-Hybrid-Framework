import * as fs from "fs";
import * as path from "path";

export class DataReader {

  // public readJSON(testDataPath: string) {
  //   const jsonString = fs.readFileSync(path.resolve() + "/test-data" + testDataPath, "utf-8");
  //   const jsonData = JSON.parse(jsonString);
  //   console.log("Test data path : " + path.resolve() + "/test-data" + testDataPath);
  //   return jsonData;
  // }

    public readJSON(testDataPath: string) {
    const jsonString = fs.readFileSync(path.resolve() + "/test-data" + testDataPath, "utf-8");
    const jsonData = JSON.parse(jsonString);
    // console.log("Test data path : " + path.resolve() + "/test-data" + testDataPath);
    return jsonData;
  }
}
