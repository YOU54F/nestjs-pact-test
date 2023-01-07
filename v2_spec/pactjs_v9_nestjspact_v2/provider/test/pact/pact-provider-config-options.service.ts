import { Injectable } from "@nestjs/common";
import {
  PactProviderOptionsFactory,
  PactProviderOptions
} from "@you54f/nestjs-pact";
import { versionFromGitTag } from "absolute-version";
import { AppRepository } from "../../src/app.repository";
import { execSync } from "child_process";
@Injectable()
export class PactProviderConfigOptionsService
  implements PactProviderOptionsFactory
{
  public constructor(private readonly animalRepository: AppRepository) {}

  public createPactProviderOptions(): PactProviderOptions {
    let token;

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

          return "Animals removed to the db";
        },
        "Has some animals": async () => {
          token = "1234";
          this.animalRepository.importData();

          return "Animals added to the db";
        },
        "Has an animal with ID 1": async () => {
          token = "1234";
          this.animalRepository.importData();

          return "Animals added to the db";
        },
        "is not authenticated": async () => {
          token = "";

          return "Invalid bearer token generated";
        }
      },

      consumerVersionSelectors: !process.env.PACT_URL
        ? verificationByProviderOpts.consumerVersionSelectors
        : undefined,
      enablePending: !process.env.PACT_URL
        ? verificationByProviderOpts.enablePending
        : undefined,
      pactUrls: process.env.PACT_URL ? [process.env.PACT_URL] : undefined,
      // Fetch pacts from broker
      pactBrokerUrl: !process.env.PACT_URL
        ? "https://test.pactflow.io/"
        : undefined,

      pactBrokerUsername:  "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
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
