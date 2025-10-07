import { Injectable } from "@nestjs/common";
import {
  PactProviderOptionsFactory,
  PactProviderOptions
} from "nestjs-pact";
import { versionFromGitTag } from "absolute-version";
import { AppRepository } from "../../src/app.repository";
import { execSync } from "child_process";
@Injectable()
export class PactProviderConfigOptionsService
  implements PactProviderOptionsFactory
{
  public constructor(private readonly animalRepository: AppRepository) {}

  public createPactProviderOptions(): PactProviderOptions {
    let token = "1234"; 
    // the tests run in a different order, compared to the ruby core,
    // and the test with description a request to create a new mate does not set state\
    // so the token is not set, and the test fails

    let verificationByProviderOpts = {
      consumerVersionSelectors: [
        {
          matchingBranch: true
        }
      ],
      enablePending: true
    };

    return {
      provider: "NestJS Provider Example",
      logLevel: "info",

      requestFilter: (req, res, next) => {
        req.headers.MY_SPECIAL_HEADER = "my special value";

        // e.g. ADD Bearer token
        req.headers.authorization = `Bearer ${token}`;
        next();
      },

      stateHandlers: {
        "Has no animals": async () => {
          this.animalRepository.clear();
          token = "1234";

          return Promise.resolve({ description: "Animals removed to the db" });
        },
        "Has some animals": async () => {
          token = "1234";
          this.animalRepository.importData();

          return Promise.resolve({ description: "Animals added to the db" });
        },
        "Has an animal with ID 1": async () => {
          token = "1234";
          this.animalRepository.importData();

          return Promise.resolve({ description: "Animals added to the db" });
        },
        "is not authenticated": async () => {
          token = "";

          return Promise.resolve({
            description: "Invalid bearer token generated"
          });
        }
      },


      ...(process.env.PACT_URL ? { pactUrls: [process.env.PACT_URL] } : {}),
      ...(!process.env.PACT_URL
        ? {
            pactBrokerUrl: "https://test.pactflow.io/",
            consumerVersionSelectors:
              verificationByProviderOpts.consumerVersionSelectors,
            enablePending: verificationByProviderOpts.enablePending
          }
        : {}),
      pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
      pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
      publishVerificationResult: process.env.CI ? true : false,
      // Your version numbers need to be unique for every different version of your provider
      // see https://docs.pact.io/getting_started/versioning_in_the_pact_broker/ for details.
      // If you use git tags, then you can use absolute-version as we do here.
      // providerVersion: execSync('git rev-parse --short HEAD').toString().trim(),
      providerVersion: versionFromGitTag(),
      providerVersionBranch: execSync("git rev-parse --abbrev-ref HEAD")
        .toString()
        .trim()
    };
  }
}
